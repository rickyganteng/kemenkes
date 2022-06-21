require('dotenv').config()
const helper = require('../../helpers')
const premiereModel = require('./premiere_model')
const locationModel = require('./location_model')
const showTimeModel = require('../show_time/show_time_model')
const redis = require('redis')
const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})

client.on('connect', () => {
  console.log('Connected to our redis instance!')
})

module.exports = {
  getPremiereName: async (req, res) => {
    try {
      const result = await premiereModel.premiereName()
      return helper.response(res, 200, 'Succes get premiere name', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  premiereInfoByMovieId: async (req, res) => {
    try {
      // console.log('movie ID', req.params)

      let { movieId, loc, date, orderBy, limit } = req.query

      limit = limit || '6'
      loc = loc || '%%'
      date = date || '%%'
      orderBy = orderBy || 'p.premiere_name ASC'

      limit = parseInt(limit)
      const totalData = await premiereModel.getCountPremiere(
        movieId,
        loc,
        orderBy
      )
      console.log('total data pre', totalData)
      console.log('Total Data ' + totalData)

      const pageInfo = {
        limit,
        totalData
      }

      const result = await premiereModel.premiereInfoByMovie(
        movieId,
        loc,
        orderBy,
        limit
      )
      for (const e of result) {
        e.showTime = await premiereModel.showTimeInfoByPremiere(
          e.premiere_id,
          date
        )
      }

      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes get Premiere Info By Movie Id ${movieId}`,
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  },
  getPremiereCond: async (req, res) => {
    try {
      // console.log('movie ID', req.params)

      let { loc, date, orderBy, limit, page } = req.query

      page = page || '1'
      limit = limit || '9'
      loc = loc || '%%'
      date = date || '%%'
      orderBy = orderBy || 'p.premiere_name ASC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit
      const totalData = await premiereModel.getCountPremiere2(
        loc,
        orderBy
      )
      console.log('total data pre', totalData)
      console.log('offset', offset)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await premiereModel.premiereInfoByMovie2(
        loc,
        orderBy,
        limit,
        offset
      )
      for (const e of result) {
        e.showTime = await premiereModel.showTimeInfoByPremiere2(
          e.premiere_id,
          date
        )
      }

      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Succes get Premiere Info ',
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  },
  getAllPremiere: async (req, res) => {
    try {
      const result = await premiereModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Premiere Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllLocation: async (req, res) => {
    try {
      const result = await locationModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Location Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await premiereModel.getDataById(id)
      // console.log(result) array ini

      if (result.length > 0) {
        return helper.response(res, 200, `Succes Get Data by Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data by Id ${id} not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getDataById(id)

      if (result.length > 0) {
        return helper.response(res, 200, `Succes Get Data by Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data by Id ${id} not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      // console.log(req.body)
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_logo: req.file ? req.file.filename : ''
      }
      // console.log(setData)
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postSchedule: async (req, res) => {
    try {
      // console.log(req.body)
      const {
        movieId,
        locationId,
        premiereName,
        premierePrice,
        // premiereId,
        showTimeDate,
        showTimeClock,
        showTimeDateEnd,
        premiereMethod
      } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_logo: premiereMethod
      }
      const result = await premiereModel.createData(setData)
      const setData2 = {
        premiere_id: result.id,
        show_time_date: showTimeDate,
        show_time_date_end: showTimeDateEnd,
        show_time_clock: showTimeClock
      }
      const result2 = await showTimeModel.createData(setData2)
      console.log(result2)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  postLocation: async (req, res) => {
    try {
      const { locationCity, locationAddres } = req.body
      const setData = {
        location_city: locationCity,
        location_addres: locationAddres
      }

      const result = await locationModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      let result = await premiereModel.getDataById(id)

      if (result.length > 0) {
        const { movieId, locationId, premiereName, premierePrice } = req.body
        const setData = {
          movie_id: movieId,
          location_id: locationId,
          premiere_name: premiereName,
          premiere_price: premierePrice,
          premiere_logo: req.file ? req.file.filename : '',
          premiere_updated_at: new Date(Date.now())
        }
        console.log('Pre data', setData)

        if (result[0].premiere_logo.length > 0) {
          console.log(`Delete Image${result[0].premiere_logo}`)
          const imgLoc = `src/uploads/${result[0].premiere_logo}`
          helper.deleteImage(imgLoc)
        } else {
          console.log('NO img in DB')
        }

        result = await premiereModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Premiere', result)
      } else {
        return helper.response(
          res,
          404,
          `Cannnot Update !. Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      let result = await locationModel.getDataById(id)

      if (result.length > 0) {
        const { locationCity, locationAddres } = req.body
        const setData = {
          location_city: locationCity,
          location_addres: locationAddres,
          location_updated_at: new Date(Date.now())
        }
        result = await locationModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Location', result)
        // console.log(result);
      } else {
        return helper.response(
          res,
          404,
          `Cannnot Update !. Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  },
  deletedPremiere: async (req, res) => {
    try {
      const { id } = req.params
      let result = await premiereModel.getDataById(id)

      if (result.length > 0) {
        result = await premiereModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Premiere With ID ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Cannot Delete !.s Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletedLocation: async (req, res) => {
    try {
      const { id } = req.params
      let result = await locationModel.getDataById(id)

      if (result.length > 0) {
        result = await locationModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Location With ID ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Cannot Delete !.s Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}

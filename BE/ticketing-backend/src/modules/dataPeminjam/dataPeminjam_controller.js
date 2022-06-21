require('dotenv').config()
const helper = require('../../helpers')
const movieModel = require('./dataPeminjam_model')
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
  getMovieName: async (req, res) => {
    try {
      const result = await movieModel.movieName()
      return helper.response(res, 200, 'Succes get movie name', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllMovie: async (req, res) => {
    try {
      // console.log(req.query)
      let { page, limit, sort, keywords } = req.query
      console.log(sort)

      limit = limit || '6'
      page = page || '1'
      keywords = keywords || '%'
      sort = sort || 'id_r ASC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      const totalData = await movieModel.getDataCount(keywords)
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(limit, offset, keywords, sort)
      // simpan data di redis

      // console.log('DATA RES', result.length)
      return helper.response(
        res,
        200,
        'Succes Get All Data',
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  // getAllMovie: async (req, res) => {
  //   try {
  //     const result = await movieModel.getDataAll()
  //     return helper.response(res, 200, 'Succes Get Booking Data', result)
  //   } catch (error) {
  //     return helper.response(res, 400, 'Bad Request', error)
  //   }
  // },
  getMovieById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      // console.log(result) array ini

      if (result.length > 0) {
        // simpan data kedalam redis
        return helper.response(res, 200, `Succes Get Data by Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data by Id ${id} not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      // console.log('Controller', req.body)
      const {
        NamaRuang,
        LantaiRuang,
        TempatRuang,
        JumlahKursi
      } = req.body
      const setData = {
        namaruang_r: NamaRuang,
        ruangan_lantai: LantaiRuang,
        alamat_gedung: TempatRuang,
        jumlah_kursi: JumlahKursi,
        image_ruangan: req.file ? req.file.filename : ''
      }
      console.log('POST DATA', setData)
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan apakah data ada dalam database berdasarakan id
      let result = await movieModel.getDataById(id)
      // console.log(result[0], '--', req.file)

      if (result.length > 0) {
        const {
          movieName,
          movieCategory,
          movieReleaseDate,
          movieDuration,
          movieDirectedBy,
          movieCasts,
          movieSynopsis
        } = req.body
        const setData = {
          movie_name: movieName,
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
          movie_duration: movieDuration,
          movie_directed_by: movieDirectedBy,
          movie_casts: movieCasts,
          movie_synopsis: movieSynopsis,
          movie_image: req.file ? req.file.filename : result[0].movie_image,
          movie_updated_at: new Date(Date.now())
        }

        if (req.file) {
          console.log('ada file')
          if (result[0].movie_image.length > 0) {
            console.log(`Delete Image${result[0].movie_image}`)
            const imgLoc = `src/uploads/${result[0].movie_image}`
            helper.deleteImage(imgLoc)
          } else {
            console.log('NO img in DB')
          }
        }
        // console.log('UPDATE DATA', req.body)
        // console.log(setData)
        // console.log('MOVIE IMAGE DB', result[0].movie_image.length)

        result = await movieModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Movie', result)
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
  deletedRuanganById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      let result = await movieModel.getDataById(id)
      // console.log(result)

      if (result.length > 0) {
        const imgLoc = `src/uploads/${result[0].image_ruangan}`
        helper.deleteImage(imgLoc)
        result = await movieModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Movie With ID ${id}`,
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

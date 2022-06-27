require('dotenv').config()
const helper = require('../../helpers')
const bookingRuanganModel = require('./waitingList_model')
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
  getBookingRuanganName: async (req, res) => {
    try {
      const result = await bookingRuanganModel.movieName()
      return helper.response(res, 200, 'Succes get movie name', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllWaitingListTanpaFill: async (req, res) => {
    try {
      const result = await bookingRuanganModel.getDataAllTanpaFill()
      return helper.response(res, 200, 'Succes Get Booking Data', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllWaitingList: async (req, res) => {
    try {
      let { page, limit, sort, keywords } = req.query

      limit = limit || '6'
      page = page || '1'
      keywords = keywords || '%'
      sort = sort || 'id ASC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      const totalData = await bookingRuanganModel.getDataCount(keywords)
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await bookingRuanganModel.getDataAll(limit, offset, keywords, sort)
      // simpan data di redis

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
  postWaitingList: async (req, res) => {
    try {
      const {
        ruangNamaPeminjam,
        ruangNIP,
        ruangNoHP,
        ruangEmail,
        ruangSatker,
        ruangDirektorat,
        ruangTanggalBooking,
        ruangKeteranganAcara,
        ruangPenanggungJawab,
        ruangYangDigunakan,
        ruangWaktuMulai,
        ruangWaktuAkhir,
        idUserr
        // ruangBuktiSuratDina
      } = req.body
      const setData = {
        booking_ruangan_nama: ruangNamaPeminjam,
        booking_ruangan_nip: ruangNIP,
        booking_ruangan_nohp: ruangNoHP,
        booking_ruangan_email: ruangEmail,
        booking_ruangan_unitkerja: ruangSatker,
        booking_ruangan_direktorat: ruangDirektorat,
        booking_ruangan_tanggal: ruangTanggalBooking,
        booking_ruangan_keterangan_kegiatan_acara: ruangKeteranganAcara,
        booking_ruangan_penaggung_jawab: ruangPenanggungJawab,
        booking_ruangan_ruangan: ruangYangDigunakan,
        booking_ruangan_waktu_penggunaan_awal: ruangWaktuMulai,
        booking_ruangan_waktu_penggunaan_akhir: ruangWaktuAkhir,
        id_peminjam: idUserr,
        booking_ruangan_surat_dinas: req.file ? req.file.filename : ''
      }
      const checkNamaRuangWaiting = await bookingRuanganModel.getDataCondition(
        ruangYangDigunakan, ruangTanggalBooking, ruangWaktuMulai, ruangWaktuAkhir
      )
      const checkNamaRuangBooking = await bookingRuanganModel.getDataConditionBooking(
        ruangYangDigunakan, ruangTanggalBooking, ruangWaktuMulai, ruangWaktuAkhir
      )
      if (checkNamaRuangWaiting.length === 0 && checkNamaRuangBooking.length === 0) {
        const result = await bookingRuanganModel.createData(setData)
        return helper.response(res, 200, 'Succes Create Data', result)

        // const result = await bookingRuanganModel.register(setData)
        // delete result.user_password

        // const url = `https://ticketingweb.herokuapp.com/backend1/api/v1/auth/change-data/${result.id}`

        // send email for verificatioan here
        // helper.sendMail('Please activate your account', url, userEmail)
      } else {
        return helper.response(res, 400, 'Tanggal booking sudah terpakai')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postWaitingListLebihSatu: async (req, res) => {
    try {
      const {
        ruangNamaPeminjam,
        ruangNIP,
        ruangNoHP,
        ruangEmail,
        ruangSatker,
        ruangDirektorat,
        ruangTanggalBooking,
        // ruangTanggalBookingAkhir,
        ruangKeteranganAcara,
        ruangPenanggungJawab,
        ruangYangDigunakan,
        ruangWaktuMulai,
        ruangWaktuAkhir,
        idUserr
        // ruangBuktiSuratDina
      } = req.body
      const d1 = new Date(ruangTanggalBooking)
      // const d2 = new Date(ruangTanggalBookingAkhir)
      const d1Getime1 = d1.getTime()

      const setData = {
        booking_ruangan_nama: ruangNamaPeminjam,
        booking_ruangan_nip: ruangNIP,
        booking_ruangan_nohp: ruangNoHP,
        booking_ruangan_email: ruangEmail,
        booking_ruangan_unitkerja: ruangSatker,
        booking_ruangan_direktorat: ruangDirektorat,
        booking_ruangan_tanggal: d1Getime1,
        // booking_ruangan_tanggal_akhir: d1Getime2,
        booking_ruangan_keterangan_kegiatan_acara: ruangKeteranganAcara,
        booking_ruangan_penaggung_jawab: ruangPenanggungJawab,
        booking_ruangan_ruangan: ruangYangDigunakan,
        booking_ruangan_waktu_penggunaan_awal: ruangWaktuMulai,
        booking_ruangan_waktu_penggunaan_akhir: ruangWaktuAkhir,
        id_peminjam: idUserr,
        booking_ruangan_surat_dinas: req.file ? req.file.filename : ''
      }
      const checkNamaRuangWaiting = await bookingRuanganModel.getDataCondition(
        ruangYangDigunakan, d1Getime1, ruangWaktuMulai, ruangWaktuAkhir
      )
      // const checkNamaRuangWaitingWaktu = await bookingRuanganModel.getDataConditionWaktu(
      //   checkNamaRuangWaitingTanggal, checkNamaRuangWaitingTanggal
      // )
      const checkNamaRuangBooking = await bookingRuanganModel.getDataConditionBookingLebihSatu(
        ruangYangDigunakan, d1Getime1, ruangWaktuMulai, ruangWaktuAkhir
      )
      if (checkNamaRuangWaiting.length === 0 && checkNamaRuangBooking.length === 0) {
        const result = await bookingRuanganModel.createData(setData)
        return helper.response(res, 200, 'Succes Create Data', result)

        // const result = await bookingRuanganModel.register(setData)
        // delete result.user_password

        // const url = `https://ticketingweb.herokuapp.com/backend1/api/v1/auth/change-data/${result.id}`

        // send email for verificatioan here
        // helper.sendMail('Please activate your account', url, userEmail)
      } else {
        return helper.response(res, 400, 'Tanggal booking sudah terpakai')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getWaitingListById: async (req, res) => {
    try {
      const { userId } = req.query
      const result = await bookingRuanganModel.getUserData(userId)

      return helper.response(
        res,
        200,
        'Succes get User Booking history !',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateWaitingList: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan apakah data ada dalam database berdasarakan id
      let result = await bookingRuanganModel.getDataById(id)

      if (result.length > 0) {
        const {
          ruangNamaPeminjam,
          ruangNIP,
          ruangNoHP,
          ruangEmail,
          ruangSatker,
          ruangDirektorat,
          ruangTanggalBooking,
          // ruangTanggalBookingAkhir,
          ruangKeteranganAcara,
          ruangPenanggungJawab,
          ruangYangDigunakan,
          ruangWaktuMulai,
          ruangWaktuAkhir,
          idUserr
        } = req.body
        const setData = {
          booking_ruangan_nama: ruangNamaPeminjam,
          booking_ruangan_nip: ruangNIP,
          booking_ruangan_nohp: ruangNoHP,
          booking_ruangan_email: ruangEmail,
          booking_ruangan_unitkerja: ruangSatker,
          booking_ruangan_direktorat: ruangDirektorat,
          booking_ruangan_tanggal: ruangTanggalBooking,
          // booking_ruangan_tanggal_akhir: ruangTanggalBookingAkhir,
          booking_ruangan_keterangan_kegiatan_acara: ruangKeteranganAcara,
          booking_ruangan_penaggung_jawab: ruangPenanggungJawab,
          booking_ruangan_ruangan: ruangYangDigunakan,
          booking_ruangan_waktu_penggunaan_awal: ruangWaktuMulai,
          booking_ruangan_waktu_penggunaan_akhir: ruangWaktuAkhir,
          id_peminjam: idUserr,
          booking_ruangan_surat_dinas: req.file ? req.file.filename : result[0].booking_ruangan_surat_dinas,
          booking_ruangan_updated_at: new Date(Date.now())
        }

        if (req.file) {
          console.log('ada file')
          if (result[0].booking_ruangan_surat_dinas.length > 0) {
            console.log(`Delete Image${result[0].booking_ruangan_surat_dinas}`)
            const imgLoc = `src/uploads/${result[0].booking_ruangan_surat_dinas}`
            helper.deleteImage(imgLoc)
          } else {
            console.log('NO img in DB')
          }
        }

        result = await bookingRuanganModel.updateData(setData, id)
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
  deletedWaitingList: async (req, res) => {
    try {
      const { id } = req.params
      let result = await bookingRuanganModel.getDataById(id)

      if (result.length > 0) {
        const imgLoc = `src/uploads/${result[0].movie_image}`
        helper.deleteImage(imgLoc)
        result = await bookingRuanganModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Booing Ruangan With ID ${id}`,
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

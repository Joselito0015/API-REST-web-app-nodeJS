const controllerCompany = require('../controller/company/controller.company')
const controllerIncident = require('../controller/incident/controller.incident')
const controllerArea = require('../controller/area/controller.area')
const controllerJetson = require('../controller/jetson/controller.jetson')
const controllerUser = require('../controller/user/controller.user')
const controllerLogin = require('../controller/login/controller.login')
const controllerReport = require('../controller/report/controller.report')
const controllerStatistics = require('../controller/statistic/controller.statistics')
const controllerToken = require('../controller/token/controller.token')
const controllerMachine = require('../controller/machine/controller.machine')
const controllerMqtt = require('../controller/mqtt/controller.mqtt')

const router = (app) => {
  app.use('/company', controllerCompany)
  app.use('/company', controllerIncident)
  app.use('/company', controllerArea)
  app.use('/company', controllerJetson)
  app.use('/company', controllerUser)
  app.use('/company', controllerReport)
  app.use('/company', controllerStatistics) 
  app.use('/company', controllerToken)
  app.use('/company', controllerMachine)
  app.use('/company', controllerMqtt)
  app.use('/', controllerLogin)
}

module.exports = router
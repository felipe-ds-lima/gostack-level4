import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProvidersController from '../controllers/ProvidersController'

const appointmentsRouter = Router()
const providersController = new ProvidersController()
const providerMonthAvailability = new ProviderMonthAvailabilityController()
const providerDayAvailability = new ProviderDayAvailabilityController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', providersController.index)

appointmentsRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index
)
appointmentsRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index
)

appointmentsRouter.get('/', providersController.index)

export default appointmentsRouter

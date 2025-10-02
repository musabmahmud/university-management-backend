import express from 'express';
import { AdminServices } from './admin.service';
import { updateAdminValidationSchema } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';


const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);
router.get('/:adminId', AdminControllers.getSingleAdmin);
router.delete('/:adminId', AdminControllers.deleteAdmin);

router.patch(
    '/update-admin/:adminId',
    validateRequest(updateAdminValidationSchema),
    AdminControllers.updateAdmin,
);

export const AdminRoutes = router;

import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdminsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admins are retrieved successfully!',
        data: result,
    });
});

const getSingleAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is retrieved successfully',
        data: result,
    });
});

const updateAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const { admin } = req.body;

    const result = await AdminServices.updateAdminIntoDB(adminId, admin);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is Updated successfully',
        data: result,
    });
});

const deleteAdmin = catchAsync(async (req, res) => {
    const { AdminId } = req.params;
    const result = await AdminServices.deleteAdminFromDB(AdminId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is deleted successfully',
        data: result,
    });
});

export const AdminControllers = {
    getAllAdmins,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
};

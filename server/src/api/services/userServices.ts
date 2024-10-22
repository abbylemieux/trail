import User from '../models/user';

export const getUserById = async (id: string) => {
    return await User.findByPk(id);
};

export const updateUser = async (id: string, updateData: any) => {
    return await User.update(updateData, { where: { id } });
};

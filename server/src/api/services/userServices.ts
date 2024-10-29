import User from "../../models/user";

export const getUserById = async (id: string) => {
    return await User.findByPk(id);
};

export const updateUser = async (id: string, updateData: any) => {
    return await User.update(updateData, { where: { id } });
};

export async function saveUser(userData: { email: string; password: string; externalId: string }) {
    try {
      const user = await User.create({
        email: userData.email,
        password: userData.password, // Ideally, hash the password before saving
        externalId: userData.externalId,
      });
      return user;
    } catch (error) {
      throw new Error('Error saving user to database');
    }
  };

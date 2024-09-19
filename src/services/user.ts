import { AppDataSource } from '../data-source'; // Adjust the path if necessary
import { User } from '../entities/user';
import createHttpError from 'http-errors';
import { UsersUpdateBody } from '../types/routes/users'; // Adjust the path if necessary

/**
 * Updates a user in the database.
 * @param userId - The ID of the user to update.
 * @param updatedDetails - The details to update (partial update).
 */
export const updateUser = async (
    userId: string,
    updatedDetails: Partial<UsersUpdateBody>
): Promise<void> => {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const userRepo = queryRunner.manager.getRepository(User);

        // Find the user by ID
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        // Validate if there's something to update
        if (!updatedDetails.desired_username && !updatedDetails.desired_email) {
            throw createHttpError(400, 'No details provided for update');
        }

        // Apply updates
        if (updatedDetails.desired_username) {
            user.username = updatedDetails.desired_username;
        }

        if (updatedDetails.desired_email) {
            user.email = updatedDetails.desired_email;
        }

        // Save the updated user entity
        await userRepo.save(user);

        // Commit the transaction
        await queryRunner.commitTransaction();
    } catch (error) {
        console.error('Error updating user:', error);
        await queryRunner.rollbackTransaction();
        throw createHttpError(500, 'Error updating user');
    } finally {
        await queryRunner.release();
    }
};

export const updateUserPassword = async (userId: string, newPassword: string) => {
    const queryRunner = AppDataSource.createQueryRunner();

    try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const userRepo = queryRunner.manager.getRepository(User);
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        user.setPassword(newPassword);
        await userRepo.save(user);

        await queryRunner.commitTransaction();
    } catch (error) {
        console.error('Error updating user:', error);
        await queryRunner.rollbackTransaction();
        throw createHttpError(500, 'Error updating user');
    } finally {
        await queryRunner.release();
    }
};
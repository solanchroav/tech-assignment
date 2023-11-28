import { generateUniqueId } from './id-generator.util';
import { Notification } from '../models/notification.model';
export function createNotification(content: string, userId: number, existingNotificationIds: number[]): Notification {
    // Create a notification object with provided content and user ID
    const notification: Notification = {
      id: generateUniqueId(existingNotificationIds).toString(), // Assuming existingNotificationIds is an array of existing IDs
      userId: userId,
      content: content,
      createdAt: new Date(),
      read: false,
      // Add other properties as needed
    };
    return notification;
  }
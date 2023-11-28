export interface Notification {
    userId: number; // ID of the user who receives the notification
    content: string;
    createdAt: Date;
    read: boolean;
    // Add other properties as needed
  }
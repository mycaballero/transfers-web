import {
  createNotifier,
  NotificationGroup,
  defineNotificationComponent,
} from "notiwind";

export type NotificationSchema = {
  title: string;
  text: string;
  type: string;
};

export const notify = createNotifier<NotificationSchema>();
export const Notification = defineNotificationComponent<NotificationSchema>();
export { NotificationGroup };

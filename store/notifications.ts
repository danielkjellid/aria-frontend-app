import { defineStore } from 'pinia'

interface Notification {
  id: string
  title: string
  text?: string
  type: 'success' | 'info' | 'warning' | 'danger'
  handled: boolean
}

interface NotificationPayload {
  title: string
  text?: string
  type: 'success' | 'info' | 'warning' | 'danger'
}

const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    create(payload: NotificationPayload) {
      const generatedId = Math.floor(Math.random() * 1000)

      this.notifications.push({ id: `${generatedId}-${payload.title}`, handled: false, ...payload })
    },
    handle(id: string) {
      const notification = this.notifications.find((n) => n.id === id)

      if (notification) {
        Object.assign(notification, {
          id: notification.id,
          title: notification.title,
          text: notification.text,
          type: notification.type,
          handled: true,
        } as Notification)
      }
    },
  },
  getters: {
    unhandledNotifications: (state) =>
      state.notifications.filter((notification) => !notification.handled),
  },
})

export default useNotificationsStore

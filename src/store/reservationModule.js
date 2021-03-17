import { reservationService } from "../services/reservation-service.js";

export const reservationStore = {
  state: {
    reservation: null,
  },
  getters: {
    reservation(state) {
      return state.reservation;
    },
  },
  mutations: {
    loadReservation(state, { reservation }) {
      state.reservation = reservation;
      console.log("this are the state reservation ", state.reservation);
    },
    updateReservation(state, { reservation }) {
      state.reservations = reservation;
    },
  },
  actions: {
    async saveReservation(context, payload) {
      const savedReservation = await reservationService.save(
        payload.reservation
      );
      context.commit({
        type: "updateReservation",
        reservation: savedReservation,
      });
    },
    async loadReservation(context, payload) {
      try {
        const reservation = await reservationService.query(payload.id);
        context.commit({ type: "loadReservation", reservation });
      } catch (err) {
        console.log("reservationStore: Error in loadReservation", err);
        throw err;
      }
    },
  },
};

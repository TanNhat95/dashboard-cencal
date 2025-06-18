import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalPhone?: string;
  notes?: string;
}

interface Vehicle {
  year: string;
  make: string;
  model: string;
}

interface FormData {
  contact: string;
  year: string;
  make: string;
  model: string;
  vehicleType: string;
}

interface Appointment {
  id: string;
  contact: Contact;
  services: string[];
  notes: string;
  date: string;
  time: string;
}

interface AppointmentState {
  contacts: Contact[];
  availableVehicles: {
    years: string[];
    makes: string[];
    models: string[];
  };
  formData: Partial<FormData>;
  step: number;
  isSelectContactOpen: boolean;
  isAddContactOpen: boolean;
  manualVehicles: Vehicle[];
  currentAppointment: Partial<Appointment>;
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  contacts: [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      additionalPhone: "",
      notes: "Default contact 1",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      additionalPhone: "",
      notes: "Default contact 2",
    },
  ],
  availableVehicles: {
    years: ["2020", "2021", "2022"],
    makes: ["Toyota", "Honda", "Ford"],
    models: ["Camry", "Civic", "F-150"],
  },
  formData: { contact: "" },
  step: 1,
  isSelectContactOpen: false,
  isAddContactOpen: false,
  manualVehicles: [],
  currentAppointment: {},
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
      if (action.payload.contact !== undefined) {
        state.formData.contact = action.payload.contact || "";
      }
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = Math.max(1, Math.min(action.payload, 3));
    },
    setIsSelectContactOpen: (state, action: PayloadAction<boolean>) => {
      state.isSelectContactOpen = action.payload;
    },
    setIsAddContactOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddContactOpen = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      if (!action.payload.email && !action.payload.phone) {
        return;
      }
      state.contacts.push({
        ...action.payload,
        email: action.payload.email || "",
        phone: action.payload.phone || "",
        additionalPhone: action.payload.additionalPhone || "",
        notes: action.payload.notes || "",
      });
    },
    addManualVehicle: (state, action: PayloadAction<Vehicle>) => {
      const { year, make, model } = action.payload;
      state.manualVehicles.push(action.payload);
      if (year && !state.availableVehicles.years.includes(year)) {
        state.availableVehicles.years.push(year);
      }
      if (make && !state.availableVehicles.makes.includes(make)) {
        state.availableVehicles.makes.push(make);
      }
      if (model && !state.availableVehicles.models.includes(model)) {
        state.availableVehicles.models.push(model);
      }
    },
    setCurrentAppointment: (
      state,
      action: PayloadAction<Partial<Appointment>>
    ) => {
      state.currentAppointment = {
        ...state.currentAppointment,
        ...action.payload,
      };
    },
    saveAppointment: (state) => {
      if (!state.currentAppointment.contact) {
        return;
      }
      const newAppointment = {
        ...state.currentAppointment,
        id: Date.now().toString(),
      } as Appointment;
      state.appointments.push(newAppointment);
      state.currentAppointment = {};
      state.formData = { contact: "" };
      state.step = 1;
    },
  },
});

export const {
  setFormData,
  setStep,
  setIsSelectContactOpen,
  setIsAddContactOpen,
  addContact,
  addManualVehicle,
  setCurrentAppointment,
  saveAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

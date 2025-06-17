import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
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
  isManualSaved: boolean;
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
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      notes: "Default contact 1",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      additionalPhone: "",
      address: "456 Elm St",
      city: "Othertown",
      state: "NY",
      zip: "67890",
      notes: "Default contact 2",
    },
  ],
  availableVehicles: {
    years: ["2020", "2021", "2022"],
    makes: ["Toyota", "Honda", "Ford"],
    models: ["Camry", "Civic", "F-150"],
  },
  formData: {},
  step: 1,
  isSelectContactOpen: false,
  isAddContactOpen: false,
  manualVehicles: [],
  isManualSaved: false,
  currentAppointment: {},
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setIsSelectContactOpen: (state, action: PayloadAction<boolean>) => {
      state.isSelectContactOpen = action.payload;
    },
    setIsAddContactOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddContactOpen = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    addManualVehicle: (state, action: PayloadAction<Vehicle>) => {
      const { year, make, model } = action.payload;
      state.manualVehicles.push(action.payload);
      if (!state.availableVehicles.years.includes(year)) {
        state.availableVehicles.years.push(year);
      }
      if (!state.availableVehicles.makes.includes(make)) {
        state.availableVehicles.makes.push(make);
      }
      if (!state.availableVehicles.models.includes(model)) {
        state.availableVehicles.models.push(model);
      }
      state.isManualSaved = true;
    },
    resetManualSaved: (state) => {
      state.isManualSaved = false;
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
      const newAppointment = {
        ...state.currentAppointment,
        id: Date.now().toString(),
      } as Appointment;
      state.appointments.push(newAppointment);
      state.currentAppointment = {};
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
  resetManualSaved,
  setCurrentAppointment,
  saveAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

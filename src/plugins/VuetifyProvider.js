import React from 'react';
import { VuetifyProvider as Vuetify } from 'vuetify';
import vuetify from './vuetify';

const VuetifyProvider = ({ children }) => <Vuetify theme={vuetify}>{children}</Vuetify>;

export default VuetifyProvider;

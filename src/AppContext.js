import {createContext} from 'react';

/*
    According to React's Docs, Context is a method to pass data through the Component trees without
    the need to pass props manually at every level. This eases the procedure of having the need
    to pass props for each Component.
*/

export const AppContext = createContext(null);
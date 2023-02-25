// data form
export const columns = [
  {name: 'engin_name', rule: 'isRequired'},
  {name: 'heures_marche', rule: 'isNumeric'},
  {name: 'date_marche', type: 'date'},
  {name: 'serie'},
  {name: 'marque'},
  {name: 'puissance'},
  {name: 'cylindre'},
];
//'type_moteur',

export const formInputs =
  // inputs type text
  columns
    .map((col) => {
      const {name, rule, type} = col;
      return {
        label: name.replace('_', ' '),
        type: type ? type : 'text',
        name: name,
        placeholder: name.replace('_', ' '),
        // check if there is a validation rule for the
        // input and set the validatione rule
        ...(rule && {validationRule: rule}),
      };
    })
    // Add other fields types
    // - type select
    .concat({
      label: 'Type Moteur',
      type: 'select',
      name: 'typemoteur',
      options: ['Diesel', 'Hydrolique', 'Electrique'],
      validationRule: 'isRequired',
    });

//////////////////////////////////////////

export const getInitialState = () => {
  let initialState = {};
  const initialInputs = columns.map((col) => col.name).values();
  for (const value of initialInputs) {
    initialState = {...initialState, [value]: ''};
  }
  return initialState;
};

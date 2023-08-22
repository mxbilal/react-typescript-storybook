import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';

// src
import './FormikForm.scss';

interface FieldOption {
  value: string;
  label: string;
}
interface FormField {
  title: string;
  fields: {
    name: string;
    label: string;
    type: string;
    options?: FieldOption[];
  }[];
}

interface FormikFormProps {
  initialValues: any;
  validationSchema: any;
  formFields: FormField[];
  onSubmit: (values: any) => void;
}

const types = ['select', 'radio'];

const FormikForm: React.FC<FormikFormProps> = ({ initialValues, validationSchema, formFields, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className='formik-form'>
        {formFields.map((field, i) => {
          const { title, fields } = field;

          return (
            <div key={i} >
              <Typography variant="h6" gutterBottom>{title}</Typography>

              <Grid container spacing={2}>
                {fields.map((field, j) => (
                  <FieldWrapper key={j} field={field} />
                ))}
              </Grid>
            </div>
          );
        })}
        <div className='submit-btn'>
          <Button variant='outlined' type="submit" > Submit </Button>
        </div>
      </Form>
    </Formik>
  );
};

const FieldWrapper: React.FC<{ field: FormField['fields'][number] }> = ({ field }) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const { name, label, type } = field;

  return (
    <Grid item xs={6}>
      {!types.includes(type) ? <TextField
        type={type || 'text'}
        name={name}
        label={label}
        variant="outlined"
        value={values[name]}
        onChange={(e) => setFieldValue(name, e.target.value)}
      />
        : type === 'radio'
          ? <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">{label}</FormLabel>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              value={values[name]}
              onChange={(e) => setFieldValue(name, e.target.value)}
            >
              {field.options?.map(option =>
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
              )}
            </RadioGroup>
          </FormControl>
          : <FormControl>
            <InputLabel id="demo-select-small-label">{label}</InputLabel>
            <Select
              labelId="demo-select-small-label"
              value={values[name]}
              label={label}
              onChange={(e) => setFieldValue(name, e.target.value)}
            >
              {field.options?.map(option =>
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              )}
            </Select>
          </FormControl>
      }
      <ErrorMessage name={name} component="div" className="error" />
    </Grid>
  );
};

export default FormikForm;

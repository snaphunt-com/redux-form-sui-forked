import { PureComponent, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Input as SuiInput,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import ReactDatePicker from 'react-datepicker';
import { Field } from 'redux-form';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

const DatePicker = ({ name, ...datePickerProps }) => {
  const render = useCallback(
    ({ readonly, ...fieldProps }) => {
      class CustomInput extends PureComponent {
        render() {
          const { value, onClick } = this.props;
          const {
            meta: { touched, error, active },
            placeholder,
          } = fieldProps;

          return (
            <SuiPopup
              trigger={
                <SuiInput
                  fluid
                  icon="calendar"
                  placeholder={placeholder}
                  value={value}
                  onClick={readonly ? null : onClick}
                  readonly={readonly}
                />
              }
              content={error}
              style={{ opacity: !active && touched && !!error ? 0.7 : 0 }}
              inverted
            />
          );
        }
      }

      const renderView = () => {
        const {
          input: { value },
          id,
          label,
          placeholder,
          readonly,
          colspan,
        } = fieldProps;

        return (
          <SuiForm.Field width={colspan}>
            <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
              {label}
            </label>
            <ReactDatePicker
              id={id || name}
              selected={value}
              customInput={<CustomInput />}
              placeholderText={placeholder}
              readonly={readonly}
            />
          </SuiForm.Field>
        );
      };

      const renderEdit = () => {
        const {
          input: { value, onFocus, onChange, onBlur },
          meta: { touched, error, active },
          id,
          label,
          placeholder,
          required,
          disabled,
          colspan,
          datePickerProps,
        } = fieldProps;

        return (
          <SuiForm.Field
            error={touched && !!error}
            required={required}
            disabled={disabled}
            width={colspan}
          >
            <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
              {label}
            </label>
            <ReactDatePicker
              id={id || name}
              selected={value}
              onChange={onChange}
              customInput={<CustomInput />}
              placeholderText={placeholder}
              disabled={disabled}
              {...datePickerProps}
            />
          </SuiForm.Field>
        );
      };

      return readonly ? renderView() : renderEdit();
    },
    [name],
  );

  return <Field {...datePickerProps} name={name} component={render} />;
};

DatePicker.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
};

DatePicker.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default DatePicker;

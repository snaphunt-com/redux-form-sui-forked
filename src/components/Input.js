import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Input as SuiInput,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field } from 'redux-form';

const Input = ({ name, ...inputProps }) => {
  const render = useCallback(
    ({ readonly, ...fieldProps }) => {
      const renderView = () => {
        // const {
        //   input: { value },
        //   label,
        // } = props;
        return null;
      };

      const renderEdit = () => {
        const {
          input,
          meta: { touched, error, active },
          id,
          label,
          required,
          disabled,
          hidden,
          colspan,
          ...props
        } = fieldProps;
        return (
          <SuiForm.Field
            error={touched && !!error}
            required={required}
            disabled={disabled}
            width={colspan}
            style={{ opacity: hidden ? 0 : 1 }}
          >
            <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
              {label}
            </label>
            <SuiPopup
              trigger={
                <SuiInput
                  {...props}
                  {...input}
                  id={id || name}
                  disabled={disabled}
                />
              }
              content={error}
              style={{ opacity: !active && touched && !!error ? 0.7 : 0 }}
              inverted
            />
          </SuiForm.Field>
        );
      };

      return readonly ? renderView() : renderEdit();
    },
    [name],
  );

  return <Field {...inputProps} name={name} component={render} />;
};

Input.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
};

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default Input;

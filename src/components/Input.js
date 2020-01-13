/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Input as SuiInput,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field } from 'redux-form';
import { isSafari } from '../utils/deviceDetect';

const Input = ({ name, ...props }) => {
  const render = useCallback(
    ({ readonly, size, ...fieldProps }) => {
      const renderView = () => {
        const {
          input: { value },
          id,
          label,
          hidden,
          colspan,
          inputProps,
        } = fieldProps;

        return (
          <SuiForm.Field width={colspan} style={{ opacity: hidden ? 0 : 1 }}>
            <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
              {label}
            </label>
            <SuiInput
              {...inputProps}
              id={id || name}
              value={value}
              readonly={readonly}
              size={size}
              {...(isSafari() && {
                css: {
                  '.ui.form .fields .field &.ui.input input, .ui.form .field &.ui.input input': {
                    width: '100%',
                  },
                },
              })}
            />
          </SuiForm.Field>
        );
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
          inputProps,
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
                  {...inputProps}
                  {...input}
                  id={id || name}
                  disabled={disabled}
                  size={size}
                  {...(isSafari() && {
                    css: {
                      '.ui.form .fields .field &.ui.input input, .ui.form .field &.ui.input input': {
                        width: '100%',
                      },
                    },
                  })}
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

  return <Field {...props} name={name} component={render} />;
};

Input.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
  size: null, // ? no supply means 'medium' in semantic-ui
  inputProps: {},
};

Input.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  size: PropTypes.string,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
};

export default Input;

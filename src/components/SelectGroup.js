import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Button as SuiButton,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field } from 'redux-form';

import './SelectGroup.scss';

const SelectGroup = ({ name, ...selectGroupProps }) => {
  const render = useCallback(({ readonly, ...fieldProps }) => {
    const renderView = () => {
      // const {
      //   input: { value },
      //   label,
      // } = props;
      return null;
    };

    const renderEdit = () => {
      const {
        input: {
          value: { options, selected },
          onFocus,
          onChange,
          onBlur,
        },
        meta: { touched, error, active },
        id,
        label,
        colspan,
        compact,
        required,
        disabled,
        ...props
      } = fieldProps;

      if (options?.length <= 0) {
        throw new Error(`Expected options as an array but found: ${options}`);
      }

      return (
        <SuiForm.Field
          error={touched && !!error}
          required={required}
          disabled={disabled}
          width={colspan}
        >
          <label style={{ whiteSpace: 'pre' }}>{label}</label>
          <SuiPopup
            trigger={
              <SuiButton.Group toggle fluid compact={compact}>
                {options.map(({ key, value, text }) => (
                  <SuiButton
                    key={key}
                    type="button"
                    active={value === selected}
                    onClick={() => onChange({ options, selected: value })}
                    disabled={disabled}
                  >
                    {text}
                  </SuiButton>
                ))}
              </SuiButton.Group>
            }
            content={error}
            style={{ opacity: !active && touched && !!error ? 0.7 : 0 }}
            inverted
          />
        </SuiForm.Field>
      );
    };

    return readonly ? renderView() : renderEdit();
  }, []);

  return <Field {...selectGroupProps} name={name} component={render} />;
};

SelectGroup.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
};

SelectGroup.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default SelectGroup;

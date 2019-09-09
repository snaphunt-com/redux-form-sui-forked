import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Dropdown as SuiDropdown,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field } from 'redux-form';

const Select = ({ name, ...selectProps }) => {
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
          input: {
            value: { options, selected },
            onFocus,
            onChange,
            onBlur,
          },
          meta: { touched, error, active },
          id,
          label,
          required,
          colspan,
          ...props
        } = fieldProps;

        if (options?.length <= 0) {
          throw new Error(`Expected options as an array but found: ${options}`);
        }

        return (
          <SuiForm.Field
            error={touched && !!error}
            required={required}
            width={colspan}
          >
            <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
              {label}
            </label>
            <SuiPopup
              trigger={
                <SuiDropdown
                  {...props}
                  id={id || name}
                  options={options}
                  value={selected}
                  onFocus={onFocus}
                  onChange={(_, { value }) =>
                    onChange({ options, selected: value })
                  }
                  onBlur={onBlur}
                  selection
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

  return <Field {...selectProps} name={name} component={render} />;
};

Select.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
};

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};

export default Select;

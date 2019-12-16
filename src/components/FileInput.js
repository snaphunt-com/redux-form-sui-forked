import { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Input as SuiInput,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field, fieldPropTypes } from 'redux-form';

const FileInput = ({
  input: { value: file, onFocus, onChange, onBlur },
  meta: { touched, error, active },
  id,
  name,
  label,
  required,
  disabled,
  readonly,
  colspan,
  inputProps,
  accept,
}) => {
  const fileInputRef = useRef(null);

  return readonly ? null : (
    <SuiForm.Field
      error={touched && !!error}
      required={required}
      disabled={disabled}
      width={colspan}
    >
      <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
        {label}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={e => onChange(e.target.files?.[0])}
        css={{ display: 'none' }}
      />
      <SuiPopup
        trigger={
          <SuiInput
            {...inputProps}
            id={id || name}
            value={file?.name}
            // * send undefined to keep existing value in redux-form
            onFocus={() => onFocus()}
            onBlur={() => onBlur()}
            disabled={disabled}
            onClick={() => fileInputRef.current.click()}
            // FIXME Why this mess up error tooltip
            // css={{ '& > input': { cursor: 'pointer' } }}
          />
        }
        content={error}
        style={{ opacity: !active && touched && !!error ? 0.7 : 0 }}
        inverted
      />
    </SuiForm.Field>
  );
};

FileInput.defaultProps = {
  id: '',
  label: '',
  disabled: false,
  readonly: false,
  inputProps: {},
  accept:
    'application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf,.doc,.docx,.xml,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

FileInput.propTypes = {
  ...fieldPropTypes,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string,
    size: PropTypes.string,
  }),
  accept: PropTypes.string,
};

export default props => <Field {...props} component={FileInput} />;

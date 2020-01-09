import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Form as SuiForm,
  Search as SuiSearch,
  Popup as SuiPopup,
} from 'semantic-ui-react';
import { Field, fieldPropTypes } from 'redux-form';
import debounce from 'lodash/debounce';
import { findByProp } from 'kickass-utilities';

// const renderView = () => {
//   const {
//     input: { value },
//     id,
//     label,
//     hidden,
//     colspan,
//   } = props;

//   return (
//     <SuiForm.Field width={colspan} style={{ opacity: hidden ? 0 : 1 }}>
//       <label htmlFor={id || name} style={{ whiteSpace: 'pre' }}>
//         {label}
//       </label>
//       <SuiInput
//         id={id || name}
//         value={value}
//         readonly={readonly}
//         size={size}
//       />
//     </SuiForm.Field>
//   );
// };

const Search = ({
  // TODO Do this for other controls too: no need id, input.name should be unique
  input: { name, value, onFocus, onChange, onBlur },
  meta: { touched, error, active },
  label,
  required,
  disabled,
  readonly,
  colspan,
  searchProps,
  search,
  autoSearch,
  searchDelay,
  onSelect,
}) => {
  const [loading, setLoading] = useState(null);

  const debouncedSearch = useCallback(
    debounce(async v => {
      setLoading(true);
      const found = await search(v?.search);
      onChange({ ...v, found });
      setLoading(false);
    }, searchDelay),
    [search, searchDelay],
  );
  // const dsRef = useRef(debouncedSearch);
  // console.log(
  //   '%csame',
  //   'font-size: 12px; color: #D6BF32',
  //   dsRef.current === debouncedSearch,
  // );
  // dsRef.current = debouncedSearch;

  return readonly ? null : (
    <SuiForm.Field
      error={touched && !!error}
      required={required}
      disabled={disabled}
      width={colspan}
    >
      <label htmlFor={name} style={{ whiteSpace: 'pre' }}>
        {label}
      </label>
      <SuiPopup
        trigger={
          <SuiSearch
            {...searchProps}
              id={name}
            loading={loading}
            value={value?.search}
            results={value?.found}
            onResultSelect={(_, { result }) => onSelect?.(result)}
            onFocus={() => onFocus(value)}
            onSearchChange={(_, { value: searchValue }) => {
              if (loading) {
                return;
              }
              onChange({ ...value, search: searchValue });
              if (autoSearch && searchValue) {
                debouncedSearch({ ...value, search: searchValue });
              }
            }}
            onBlur={() => onBlur(value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                debouncedSearch(value);
                debouncedSearch.flush();
              }
            }}
          />
        }
        content={error}
        style={{ opacity: !active && touched && !!error ? 0.7 : 0 }}
        inverted
      />
    </SuiForm.Field>
  );
};

Search.defaultProps = {
  label: '',
  disabled: false,
  readonly: false,
  searchProps: {},
  autoSearch: false,
  searchDelay: 500,
};

Search.propTypes = {
  ...fieldPropTypes,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  searchProps: PropTypes.shape({
    placeholder: PropTypes.string,
    size: PropTypes.string,
  }),
  search: PropTypes.func.isRequired,
  autoSearch: PropTypes.bool,
  searchDelay: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default props => <Field {...props} component={Search} />;

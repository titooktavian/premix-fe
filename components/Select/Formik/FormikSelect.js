import classnames from "classnames";
import propTypes from "prop-types";
import { Field } from "formik";
import ReactSelect from "../Select";

const Index = ({
    label,
    id,
    readOnly,
    topSpace,
    value,
    form,
    disabled,
    required,
    helperText,
    useAsterisk,
    placeholder,
    onChange,
    data,
}) => {
    const isFieldError =
        required && Boolean(form?.touched[id]) && Boolean(form?.errors[id]);

    return (
        <div className={classnames("flex flex-col", { "mt-3": topSpace })}>
            <div
                className={classnames("mb-[6px] flex w-full", {
                    "justify-end": !label,
                    "items-center justify-between": label
                })}
            >
                {!!label && (
                    <div>
                        <label
                            htmlFor={id}
                            className="text-sm font-medium text-dark-300"
                        >
                            {label} {useAsterisk && <span className="text-red-300">*</span>}
                        </label>
                    </div>
                )}
            </div>
            <div
                className="flex w-full items-center"
            >
                <ReactSelect
                    value={value}
                    data={data}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                />
            </div>
            {!!helperText && (
                <div className="mt-2 flex">
                    <p className="text-xs font-medium text-dark-100">
                        {helperText}
                    </p>
                </div>
            )}
            {isFieldError && (
                <div className="mt-1 flex">
                    <p className="text-xs font-medium text-red-300">
                        {form.errors[id]}
                    </p>
                </div>
            )}
        </div>
    );
};


Index.propTypes = {
    label: propTypes.string,
    placeholder: propTypes.string,
    id: propTypes.string.isRequired,
    required: propTypes.bool,
    disabled: propTypes.bool,
    readOnly: propTypes.bool,
    topSpace: propTypes.bool,
    helperText: propTypes.string,
    form: propTypes.object.isRequired,
    useAsterisk: propTypes.bool,
    onChange: propTypes.func,
    value: propTypes.oneOfType([
        propTypes.number,
        propTypes.string,
    ]),
    data: propTypes.arrayOf(propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.array,
        propTypes.object,
    ])),
};

Index.defaultProps = {
    helperText: "",
    value: "",
    placeholder: "Select Item",
    disabled: false,
    readOnly: false,
    label: "",
    required: false,
    topSpace: true,
    useAsterisk: false,
    data: [],
    onChange: () => {},
};

const SelectField = ({ ...rest }) => <Field {...rest} component={Index} />;

export default SelectField;

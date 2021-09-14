export const required = (v: any) => {
    if (!v || v === ''){
        return "This field is required"
    }
    return undefined;
}

export const minLength = (min: any) => (value: any) =>
  value && value.length < min ? `Must be ${min} characters` : undefined
export const minLength6 = minLength(6)
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class CannotWithConstraint implements ValidatorConstraintInterface {
  validate(
    _value: unknown,
    { constraints, ...args }: ValidationArguments
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const object = args.object as any

    return constraints.every(constraint => !object[constraint])
  }

  defaultMessage({ property, constraints }: ValidationArguments): string {
    const join = constraints.join(', ')

    return `${property} cannot be used with ${join}`
  }
}

export function CannotWith(props: Array<string>, options?: ValidationOptions) {
  return function (
    // eslint-disable-next-line @typescript-eslint/ban-types
    { constructor: target }: Object,
    propertyName: string
  ): void {
    registerDecorator({
      target,
      propertyName,
      options,
      constraints: props,
      validator: CannotWithConstraint
    })
  }
}

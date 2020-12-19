import { Validator } from 'class-validator'

import { CannotWith } from '../../../src/validators/cannot-with.validator'

const validator = new Validator()

describe('cannot-with validator', () => {
  class Example {
    @CannotWith(['bar'])
    foo!: string
    bar?: string
  }

  test('should fail if both properties are defined', async () => {
    const model = new Example()
    model.foo = 'foo'
    model.bar = 'bar'

    const errors = await validator.validate(model)

    expect(errors.length).toEqual(1)
    expect(errors[0].constraints).toEqual({
      CannotWithConstraint: 'foo cannot be used with bar'
    })
  })

  test('should pass if only one property is defined', async () => {
    const model = new Example()
    model.foo = 'foo'

    const errors = await validator.validate(model)

    expect(errors.length).toEqual(0)
  })
})

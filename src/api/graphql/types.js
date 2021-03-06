import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import validator from 'validator';

export const EmailScalar = {
  __serialize: value => validator.normalizeEmail(value),
  __parseValue: value => validator.normalizeEmail(value),
  __parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Email is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (!validator.isEmail(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast]);
    }
    if (ast.value.length < 4) {
      throw new GraphQLError(`Query error: Email must have a minimum length of 4.`, [ast]);
    }
    if (ast.value.length > 300) {
      throw new GraphQLError(`Query error: Email is too long.`, [ast]);
    }
    return validator.normalizeEmail(ast.value);
  }
};

export const PasswordScalar = {
  __serialize: value => String(value),
  __parseValue: value => String(value),
  __parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: Password is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 6) {
      throw new GraphQLError(`Query error: Password must have a minimum length of 6.`, [ast]);
    }
    if (ast.value.length > 60) {
      throw new GraphQLError(`Query error: Password is too long.`, [ast]);
    }
    return String(ast.value);
  }
};

export const URLScalar = {
  __serialize: value => String(value),
  __parseValue: value => String(value),
  __parseLiteral: ast => {
    if (!validator.isURL(ast.value)) {
      throw new GraphQLError('Query error: Not a valid URL', [ast]);
    }
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Query error: URL is not a string, it is a: ${ast.kind}`, [ast]);
    }
    if (ast.value.length < 1) {
      throw new GraphQLError(`Query error: URL must have a minimum length of 1.`, [ast]);
    }
    if (ast.value.length > 2083) {
      throw new GraphQLError(`Query error: URL is too long.`, [ast]);
    }
    return String(ast.value);
  }
};

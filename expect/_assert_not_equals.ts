// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

// This file is copied from `std/assert`.

import { AssertionError } from "../assert/assertion_error.ts";
import { buildNotEqualErrorMessage } from "./_build_message.ts";
import { equal } from "./_equal.ts";
import { EqualOptions } from "./_types.ts";

/**
 * Make an assertion that `actual` and `expected` are not equal, deeply.
 * If not then throw.
 *
 * Type parameter can be specified to ensure values under comparison have the same type.
 *
 * @example
 * ```ts
 * import { assertNotEquals } from "https://deno.land/std@$STD_VERSION/assert/assert_not_equals.ts";
 *
 * assertNotEquals(1, 2); // Doesn't throw
 * assertNotEquals(1, 1); // Throws
 * ```
 */
export function assertNotEquals<T>(
  actual: T,
  expected: T,
  options?: EqualOptions,
) {
  const { msg } = options || {};

  if (!equal(actual, expected, options)) {
    return;
  }

  const message = buildNotEqualErrorMessage(actual, expected, { msg });
  throw new AssertionError(message);
}

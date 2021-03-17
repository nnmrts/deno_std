// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
import type { CallbackWithError } from "./_fs_common.ts";
import { fromFileUrl } from "../path.ts";

function getValidTime(
  time: number | string | Date,
  name: string,
): number | Date {
  if (typeof time === "string") {
    time = Number(time);
  }

  if (
    typeof time === "number" &&
    (Number.isNaN(time) || !Number.isFinite(time))
  ) {
    throw new Deno.errors.InvalidData(
      `invalid ${name}, must not be infitiny or NaN`,
    );
  }

  return time;
}

export function utimes(
  path: string | URL,
  atime: number | string | Date,
  mtime: number | string | Date,
  callback: CallbackWithError,
): void {
  path = path instanceof URL ? fromFileUrl(path) : path;

  if (!callback) {
    throw new Deno.errors.InvalidData("No callback function supplied");
  }

  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");

  Deno.utime(path, atime, mtime).then(() => callback(null), callback);
}

export function utimesSync(
  path: string | URL,
  atime: number | string | Date,
  mtime: number | string | Date,
): void {
  path = path instanceof URL ? fromFileUrl(path) : path;
  atime = getValidTime(atime, "atime");
  mtime = getValidTime(mtime, "mtime");

  Deno.utimeSync(path, atime, mtime);
}

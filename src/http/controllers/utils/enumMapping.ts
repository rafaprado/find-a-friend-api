import { nativeEnum } from "zod"

export function enumMapping(enumLikeObject: {}) {
  const parsedObject = nativeEnum(enumLikeObject)
  return Object.keys(parsedObject.enum) as [keyof typeof parsedObject.enum]
}
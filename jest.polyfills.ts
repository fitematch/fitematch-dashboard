import { TextDecoder, TextEncoder } from 'util'
import {
  ReadableStream,
  TransformStream,
  WritableStream,
} from 'stream/web'

Object.defineProperty(globalThis, 'TextEncoder', {
  value: TextEncoder,
  writable: true,
})

Object.defineProperty(globalThis, 'TextDecoder', {
  value: TextDecoder,
  writable: true,
})

Object.defineProperty(globalThis, 'ReadableStream', {
  value: ReadableStream,
  writable: true,
})

Object.defineProperty(globalThis, 'TransformStream', {
  value: TransformStream,
  writable: true,
})

Object.defineProperty(globalThis, 'WritableStream', {
  value: WritableStream,
  writable: true,
})

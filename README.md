# @nicotordev/nicodropzone

A lightweight wrapper around a custom Dropzone file API hosted on your VPS.  
Easily upload, retrieve, and delete files through a clean and typed interface.

---

## 📦 Installation

```bash
npm install @nicotordev/nicodropzone
```

or

```bash
yarn add @nicotordev/nicodropzone
```

---

## 🚀 Usage

```ts
import NicoDropzone from '@nicotordev/nicodropzone';

const dropzone = new NicoDropzone(
  'https://your-vps.com/api', // baseURL
  'your-api-key',             // x-api-key
  'my-files'                  // basePath
);

// Upload files
const uploadedFiles = await dropzone.uploadFiles('images', [file1, file2]);

// Get files
const files = await dropzone.getFiles('images');

// Delete a file
await dropzone.deleteFile('images/my-pic.jpg', null);
```

---

## 📘 API

### `constructor(baseURL: string, apiKey: string, basePath: string)`

Creates an instance of the Dropzone client.

### `uploadFiles(path: string, files: File[]): Promise<NicoDropzoneFile[]>`

Uploads an array of files to the given path.

### `getFiles(path: string): Promise<NicoDropzoneFile[] | null>`

Retrieves a list of files stored at the given path.

### `deleteFile(src: string, preview?: string | null): Promise<void>`

Deletes a file from the server by its `src` path.

---

## 🔧 Development

Clone the repository and install dependencies:

```bash
npm install
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

### Test

```bash
npm run test
```

---

## 🧩 Related Packages

- [`@nicotordev/fetch-client`](https://www.npmjs.com/package/@nicotordev/fetch-client) — Typed wrapper around Fetch API, used internally.

---

## 📄 License

MIT © [Nicolas Torres](mailto:nicotordev@gmail.com)

---

## 💡 Notes

- Requires your server to expose `/files/with-path` and `/files` endpoints.
- Ensure the correct `x-api-key` is used to authorize requests.

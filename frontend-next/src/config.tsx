interface ConfigProps {
  backendurl: URL;
}

export const config: ConfigProps = {
  backendurl: new URL(import.meta.env.VITE_BACKEND_URL),
};
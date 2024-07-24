import { Button } from "@nextui-org/react";
export default function App() {
  return (
    <div className="p-10">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <div
        style={{
          backgroundColor: "#0012F5",
          color: "#ffffff",
          borderRadius: "4px",
          padding: "8px 16px",
        }}
      >
        Lorem ipsum
      </div>
    </div>
  );
}

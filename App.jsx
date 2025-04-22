function App() {
  const [formData, setFormData] = React.useState(null);
  const [showDisplay, setShowDisplay] = React.useState(false);

  const handleSubmit = (data) => {
    setFormData(data);
    setShowDisplay(true);
  };

  return (
    <div>
      {!showDisplay ? (
        <ContactForm onSubmit={handleSubmit} />
      ) : (
        <FormDisplay data={formData} />
      )}
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

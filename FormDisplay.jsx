function FormDisplay({ data }) {
  console.log(data);
  return (
    <div className="form-display">
      <h2>Gönderilen Form Bilgileri</h2>
      <p>
        <strong>İsim:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Telefon:</strong> {data.phone}
      </p>
      <p>
        <strong>Mesaj:</strong> {data.message}
      </p>
      <p>
        <strong>Departman:</strong> {data.department}
      </p>
      <p>
        <strong>Bültene abone ol:</strong> {data.newsletter ? "Evet" : "Hayır"}
      </p>
      <p>
        <strong>İletişim Yöntemi:</strong> {data.contactMethod}
      </p>
    </div>
  );
}



// Temporary TestProfileCard.jsx
function TestProfileCard({ profile }) {
  console.log("🃏 Rendering profile card:", profile);
  
  return (
    <div style={{ 
      border: '2px solid red', 
      padding: '16px', 
      margin: '8px', 
      backgroundColor: 'white',
      borderRadius: '8px'
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: 'blue' }}>
        {profile.fullName || 'No Name'}
      </h3>
      <p style={{ margin: '4px 0' }}>Age: {profile.age || 'N/A'}</p>
      <p style={{ margin: '4px 0' }}>Gender: {profile.gender || 'N/A'}</p>
      <p style={{ margin: '4px 0' }}>Location: {profile.location || 'N/A'}</p>
      <p style={{ margin: '4px 0' }}>Religion: {profile.religion || 'N/A'}</p>
      <p style={{ margin: '4px 0', fontSize: '12px', color: 'gray' }}>
        ID: {profile.id} | Has Image: {!!profile.profileImage}
      </p>
    </div>
  );
}
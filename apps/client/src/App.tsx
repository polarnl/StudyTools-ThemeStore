function App() {

  function inject() {
    const json = `{
  "name": "TEST2",
  "author": "test"
}`;
    const el = document.createElement('StudyToolLoadComand');
    el.setAttribute('themeJson', json);
    document.body.appendChild(el);
  }

  return (
    <>
      <div style={{ display: 'none' }} id="magisterStudyToolsInstalledVisible">
        <h1>Hier komt de theme store, maar die moet ik nog maken...</h1>
        <h2>Voor nu is hier een importknop</h2>
        <button style={{ margin: '8px' }} onClick={inject}>
          Import Theme
        </button>
      </div>
      <div id="magisterStudyToolsInstalledNotVisible">
        <h1>Instaleer study tools voor magister om de store te kunnen gebruiken</h1>
      </div>
    </>
  );
}

export default App

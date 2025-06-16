function App() {

  function inject(id: number) {
    const json = store.themes.find(theme => theme.id === id);
    const el = document.createElement('StudyToolLoadComand');
    el.setAttribute('themeJson', JSON.stringify(json));
    document.body.appendChild(el);
  }
  const store = {
    version: "1.0",
    themes: [
      {
        id: 1,
        STVersion: 3.13,
        name: "Magister",
        description: "Het is magister, wat wil je nog meer weten?",
        author: "Magister"
      },
      {
        id: 2,
        STVersion: 3.13,
        name: "Magister Dark",
        description: "Het is magister, maar dan in het donker.",
        author: "Siemvk",
        ptheme: "dark,207,95,2",
        pagecolor: "false,0,0,58",
        "sidecolor": "true,207,95,0"
      }
    ]
  }

  return (
    <>
      <div style={{ display: 'none' }} id="magisterStudyToolsInstalledVisible">
        {store.themes.map(theme => (
          <div key={theme.id}>
            <h2>{theme.name}</h2>
            <p>{theme.description}</p>
            <p>Author: {theme.author}</p>
            <button onClick={() => inject(theme.id)}>Install</button>
          </div>
        ))}
      </div>
      <div id="magisterStudyToolsInstalledNotVisible">
        <h1>Instaleer study tools voor magister om de store te kunnen gebruiken</h1>
      </div>
    </>
  );
}

export default App

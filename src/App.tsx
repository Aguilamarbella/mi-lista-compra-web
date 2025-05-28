import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// No necesitas importar ReactDOM aquí

// --- Interfaces ---
interface ProductDefinition {
  shortName: string;
  fullName: string;
  icon: string;
}

interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
}

// --- Product Catalog (Como lo tenías) ---
const productCatalog: ProductDefinition[] = [
  { shortName: "Pollo", fullName: "POLLO LIMPIO FRESCO, AVINATUR, BANDEJA 850 g APROX", icon: "🐔" },
  { shortName: "Carcasas", fullName: "POLLO CARCASAS ESPINAZOS FRESCO", icon: "🦴" },
  { shortName: "Carne picada", fullName: "CARNE PICADA POLLO BURGER MEAT FRESCO, EMB.MART, BAND1 kg", icon: "🥩" },
  { shortName: "Pavo a tacos", fullName: "PAVO A TACOS FRESCO, PROCAVI, BANDEJA 600 G", icon: "🦃" },
  { shortName: "Salchichas", fullName: "SALCHICA FRANKFURT 7 u", icon: "🌭" },
  { shortName: "Fideo fino", fullName: "FIDEO FINO CABELLO DE ANGEL", icon: "🍜" },
  { shortName: "Fideo Mediano", fullName: "FIDEO MEDIANO PASTA, HACENDADO, PAQUETE 500 g", icon: "🍝" },
  { shortName: "Arroz vapor", fullName: "ARROZ VAPORIZADO REDONDO SABROZ, BRILLANTE, PAQUETE 1 kg", icon: "🍚" },
  { shortName: "Macarron fino", fullName: "MACARRON FINO PASTA, HACENDADO, PAQUETE 500 g", icon: "🌀" },
  { shortName: "Espaguettis", fullName: "ESPAGUETI PASTA, HACENDADO, PAQUETE 500 g", icon: "📜" },
  { shortName: "Lentejas", fullName: "LENTEJA PARDINA, HACENDADO, PAQUETE 1 kg", icon: "🌰" },
  { shortName: "Garbanzos", fullName: "GARBANZO PEDROSILLANO, HACENDADO, PAQUETE 1 KG", icon: "🟡" },
  { shortName: "Pimiento verde", fullName: "PIMIENTO VERDE FREIR (VENTA POR UNIDADES),", icon: "🥬" },
  { shortName: "Zanahoria", fullName: "ZANAHORIA, VARIOS, PAQUETE 1 kg", icon: "🥕" },
  { shortName: "Calabacin", fullName: "CALABACIN VERDE ( VENTA POR UNIDADES ), VARIOS, GRANEL", icon: "🥒" },
  { shortName: "Puerros", fullName: "AJO PUERRO, VARIOS, PAQUETE 2 u - 900 g APROX", icon: "🌿" },
  { shortName: "Ajos", fullName: "AJO SECO, VARIOS, MALLA 250 g", icon: "🧄" },
  { shortName: "Cebollas", fullName: "CEBOLLA TUBO, VARIOS, MALLA 1 kg", icon: "🧅" },
  { shortName: "Apio", fullName: "APIO VERDE FRESCO, VARIOS, PAQUETE 660 g APROX", icon: "🎍" },
  { shortName: "Repollo", fullName: "REPOLLO LISO, VARIOS, u 1315 g APROX", icon: "🥬" },
  { shortName: "Calabaza", fullName: "CALABAZA A TROZOS, VARIOS, PAQUETE 510 g APROX", icon: "🎃" },
  { shortName: "Pastillas caldo", fullName: "CALDO DESHIDRATADO PASTILLAS VEGETAL, CLECA, CAJA 12 PASTILLAS - 120 g", icon: "🧱" },
  { shortName: "Sal fina", fullName: "SAL FINA SECA YODADA", icon: "🧂" },
  { shortName: "Sal gruesa", fullName: "SAL GRUESA", icon: "💎" },
  { shortName: "Galletas", fullName: "GALLETA TOSTADA, HACENDADO, PAQUETE 4 TUBOS - 800 g", icon: "🍪" },
  { shortName: "Aceite girasol", fullName: "ACEITE GIRASOL TAPON AMARILLO ***TAMAÑO AHORRO***, HAC, GARRAFA 5 l", icon: "🌻" },
  { shortName: "Aceite oliva", fullName: "ACEITE OLIVA VIRGEN TAPON VERDE ***TAMAÑO AHORRO***, HAC, GARRAFA 3 l", icon: "🍶" },
  { shortName: "Agua 8 litros", fullName: "AGUA MINERAL NATURAL ***TAMAÑO AHORRO***, FONT NATURA, GARRAFA 8 l", icon: "💧" },
  { shortName: "Barra pan", fullName: "PAN BARRA NORMAL, MERCADONA, PAQUETE 3 u - 750 g", icon: "🥖" },
  { shortName: "Tomate canario", fullName: "TOMATE CANARIO (VENTA POR UNIDADES), VARIOS", icon: "🍅" },
  { shortName: "Lechuga iceberg", fullName: "LECHUGA ICEBERG", icon: "🥗" },
  { shortName: "Queso rallado grana padano", fullName: "QUESO RALLADO POLVO GRANA PADANO, HACENDADO, PAQUETE 100G.", icon: "🧀" },
  { shortName: "Queso 4 hilos", fullName: "QUESO RALLADO HILOS 4 VARIEDADES (EMENTAL-CHEDAR-GOU-CUR) PAQ 180 g", icon: "🧀🧵" },
  { shortName: "Azucar moreno", fullName: "AZUCAR MORENO, ACOR, PAQUETE 1 kg", icon: "🟫" },
  { shortName: "Huevos", fullName: "HUEVOS", icon: "🥚" },
  { shortName: "Vinagre manzana", fullName: "VINAGRE MANZANA", icon: "🍎🍶" },
  { shortName: "Yogur natural azucar", fullName: "YOGUR NATURAL AZUCARADO, HACENDADO, PACK 12 x 125 g - 1,5 kg", icon: "🥛🍦" },
  { shortName: "Yogur natural", fullName: "YOGUR NATURAL, HACENDADO, PACK 6 x 125 g - 1,5 kg", icon: "🥛" },
  { shortName: "Petit", fullName: "PETIT FRUTAS VARIADAS 6 FRESA Y 6 FRESA-PLATANO PACK 12 x 60 g - 720 g", icon: "🍓🍌" },
  { shortName: "Natillas", fullName: "NATILLA VAINILLA, HACENDADO, PACK 4 x 125 g - 500 g", icon: "🍮" },
  { shortName: "Gelatina", fullName: "GELATINA FRESA CON ZUMO DE FRUTAS PACK 6 x 100 g - 600 g", icon: "🍓🍮" },
  { shortName: "Manzana golden", fullName: "MANZANA GOLDEN, VARIOS, BOLSA 1500 g APROX", icon: "🍏" },
  { shortName: "Tomate triturado 400", fullName: "TOMATE NATURAL TRITURADO, HACENDADO, BOTE 400 g", icon: "🥫" },
  { shortName: "Tomate triturado 800", fullName: "TOMATE NATURAL TRITURADO, HACENDADO, BOTE 800 g", icon: "🥫🥫" },
  { shortName: "Tomate frito", fullName: "TOMATE FRITO, HACENDADO, BRICK 3 x 400 g -1200 g", icon: "🧱🍅" },
  { shortName: "Atun claro", fullName: "ATUN CLARO EN ACEITE VEGETAL GIRASOL PACK6-480g-336 g", icon: "🐟" },
  { shortName: "Lejia", fullName: "LEJIA NORMAL (APTA PARA DESINFECCION AGUA DE BEBIDA), BOSQUE V BOT 2 l", icon: "🧪" },
  { shortName: "Lavavajillas", fullName: "LAVAVAJILLAS MANO (GARRAFA BLANCA), BOSQUE VERDE, GARRAFA 1,3 l", icon: "🧼🍽️" },
  { shortName: "Suavizante azul", fullName: "SUAVIZANTE ROPA CONCENTRADO AZUL (LARGA DURACION), BOSQUE V, BOT 2 l", icon: "🧴" },
  { shortName: "Desengrasante", fullName: "DESENGRASANTE COCINAS Y TEJIDOS CITRICO", icon: "✨" },
  { shortName: "Detergente lavadora", fullName: "DETERGENTE LAV. LIQ. ROPA BLANCA Y COLOR, BOSQUE VERDE, 4 l - 61LAV", icon: "🧺" },
  { shortName: "Detergente marsella", fullName: "DETERGENTE LAVADORA LIQUIDO MARSELLA, BOSQUE VERDE 4 l - 61 LAV", icon: "🧼🇫🇷" },
  { shortName: "Papel aluminio", fullName: "PAPEL ALUMINIO", icon: "⚙️🌯" },
  { shortName: "Film Transparente", fullName: "FILM TRANSPARENTE", icon: "🎞️" },
  { shortName: "Papel higienico", fullName: "PAPEL HIGIENICO DOBLE ROLLO 2 CAPAS", icon: "🧻" },
  { shortName: "Jumbo", fullName: "JUMBO", icon: "🐘🧻" },
  { shortName: "Bolsa basura 50", fullName: "BOLSA BASURA CUBO GRANDE 50 BLANCA", icon: "🗑️🗑️" },
  { shortName: "Bolsa basura 30", fullName: "BOLSA BASURA CUBO MEDIANO 30 GRIS", icon: "🗑️" },
  { shortName: "Bolsa basura 10", fullName: "BOLSA BASURA CUBO PEQUEÑO 10 LITROS MINI AROMA LIMON (BLANCA) PAQ40", icon: "🍋🗑️" },
  { shortName: "Recambio jabon", fullName: "RECAMBIO JABON MANOS LIQUIDO DERMO PROTECTOR", icon: "💧🧼" },
  { shortName: "Estropajo verde", fullName: "ESTROPAJO FIBRA VERDE PEQUEÑO COCINA, BOSQUE VERDE, PAQUETE 4 u", icon: "🧽" },
];

const ITEMS_PER_PAGE = 8;

const getTodaysDateForFileName = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
};

const getTodaysDateForInput = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

const ShoppingAppComp: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodaysDateForInput());
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [manualItemName, setManualItemName] = useState<string>("");
  const [currentProductPage, setCurrentProductPage] = useState<number>(0);

  useEffect(() => {
    const savedListRaw = localStorage.getItem('shoppingListApp-list');
    const savedDate = localStorage.getItem('shoppingListApp-date');
    if (savedListRaw) {
      try {
        const savedList = JSON.parse(savedListRaw);
        if (Array.isArray(savedList)) {
          setShoppingList(savedList);
        }
      } catch (error) {
        console.error("Error parsing saved shopping list:", error);
        localStorage.removeItem('shoppingListApp-list');
      }
    }
    if (savedDate) {
      setSelectedDate(savedDate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingListApp-list', JSON.stringify(shoppingList));
    localStorage.setItem('shoppingListApp-date', selectedDate);
  }, [shoppingList, selectedDate]);

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const addItemToList = (itemName: string, isManual: boolean = false) => {
    let finalItemName = itemName.trim();
    if (!finalItemName) return;

    if (isManual) {
      finalItemName = finalItemName.toUpperCase();
    }

    setShoppingList(prevList => {
      const existingItemIndex = prevList.findIndex(item => item.name.toLowerCase() === finalItemName.toLowerCase());
      if (existingItemIndex > -1) {
        const newList = [...prevList];
        newList[existingItemIndex] = {
          ...newList[existingItemIndex],
          quantity: newList[existingItemIndex].quantity + 1,
        };
        return newList;
      } else {
        return [{ id: Date.now().toString() + Math.random().toString(36).substring(2, 9), name: finalItemName, quantity: 1 }, ...prevList];
      }
    });
  };

  const handleProductIconClick = (product: ProductDefinition) => {
    addItemToList(product.fullName);
  };

  const handleManualAddSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addItemToList(manualItemName, true);
    setManualItemName("");
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const quantity = Math.max(0, newQuantity);
    setShoppingList(prevList =>
      prevList.map(item =>
        item.id === itemId ? { ...item, quantity: quantity } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setShoppingList(prevList => prevList.filter(item => item.id !== itemId));
  };

  const totalProductPages = Math.ceil(productCatalog.length / ITEMS_PER_PAGE);
  const startIndex = currentProductPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = productCatalog.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentProductPage(prev => Math.min(prev + 1, totalProductPages - 1));
  };
  const goToPrevPage = () => {
    setCurrentProductPage(prev => Math.max(prev - 1, 0));
  };

  const generateListText = (): string => {
    let listText = `Lista de la Compra - Fecha: ${selectedDate}\n\n`;
    shoppingList.forEach(item => {
      listText += `${item.quantity} x ${item.name}\n`;
    });
    return listText;
  };

  const saveListToFile = (fileName?: string): string => {
    const textToSave = generateListText();
    const blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const finalFileName = fileName || `${getTodaysDateForFileName()}.txt`;
    link.download = finalFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    return finalFileName;
  };

  const loadListFromFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          const lines = content.split('\n').filter(line => line.trim() !== "");
          const newList: ShoppingListItem[] = [];
          let fileDate = getTodaysDateForInput();
          lines.forEach(line => {
            if (line.startsWith("Lista de la Compra - Fecha: ")) {
              const datePart = line.substring("Lista de la Compra - Fecha: ".length).trim();
              if (datePart.includes('-') && datePart.length === 10) {
                  fileDate = datePart;
              }
            } else {
              const match = line.match(/^(\d+)\s*x\s*(.+)$/);
              if (match) {
                newList.push({
                  id: Date.now().toString() + Math.random().toString(36).substring(2,9),
                  name: match[2].trim(),
                  quantity: parseInt(match[1], 10),
                });
              }
            }
          });
          setSelectedDate(fileDate);
          setShoppingList(newList.reverse());
        }
      };
      reader.readAsText(file);
    }
    if (event.target) { 
        event.target.value = "";
    }
  };

  const shareListViaWhatsApp = () => {
    saveListToFile(); 
    const textToShare = generateListText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToShare)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendListByEmail = () => {
    const savedFileName = saveListToFile(); 
    const subject = `Lista de la Compra - ${selectedDate}`;
    const body = `Hola,\n\nAdjunto mi lista de la compra:\n\n${generateListText()}\n\nEl archivo de esta lista también se ha guardado como "${savedFileName}" en tus descargas. Puedes adjuntarlo a este correo si lo deseas.\n\nSaludos.`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-bold text-center text-brand-primary drop-shadow-lg">
        Lista de la Compra
      </h1>
      <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center">
        <label htmlFor="shoppingDate" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de la compra:
        </label>
        <input
          type="date"
          id="shoppingDate"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
        />
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-semibold text-brand-secondary">Productos Rápidos</h2>
            <div className="flex space-x-2">
                {/* CORRECCIÓN para el texto de los botones */}
                <button onClick={goToPrevPage} disabled={currentProductPage === 0} className="px-3 py-1 bg-amber-300 hover:bg-amber-400 text-amber-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" > {'< Ant'} </button>
                <span className="text-sm text-gray-600 self-center"> Pág {currentProductPage + 1} de {totalProductPages} </span>
                <button onClick={goToNextPage} disabled={currentProductPage >= totalProductPages - 1} className="px-3 py-1 bg-amber-300 hover:bg-amber-400 text-amber-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed" > {'Sig >'} </button>
            </div>
        </div>
        <div className="product-page-grid">
            {currentProducts.map((product, index) => (
              <button key={startIndex + index} onClick={() => handleProductIconClick(product)} className="flex flex-col items-center justify-center w-full h-28 p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50" >
                <span className="text-3xl mb-1">{product.icon}</span>
                <span className="text-xs font-medium text-center">{product.shortName}</span>
              </button>
            ))}
            {/* Relleno para mantener la estructura del grid si la última página no está llena */}
            {Array(ITEMS_PER_PAGE - currentProducts.length).fill(0).map((_, i) => ( <div key={`placeholder-${i}`} className="w-full h-28"></div> ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-brand-secondary mb-3">Mi Lista</h2>
        {shoppingList.length === 0 ? ( <p className="text-gray-500 italic">Tu lista está vacía. ¡Añade productos!</p> ) : (
          <ul className="space-y-3">
            {shoppingList.map((item) => (
              <li key={item.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg shadow-sm hover:shadow-md transition-shadow" >
                <span className="flex-grow text-gray-700 mr-2">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} min="1" className="w-16 p-1.5 rounded-md text-center quantity-input" />
                  <button onClick={() => handleDeleteItem(item.id)} className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-md transition-colors" aria-label="Eliminar item" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleManualAddSubmit} className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3">
        <input type="text" value={manualItemName} onChange={(e) => setManualItemName(e.target.value)} placeholder="Añadir producto manualmente..." className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
        <button type="submit" className="p-3 bg-brand-accent hover:bg-pink-500 text-white font-semibold rounded-md shadow-md transition-colors transform hover:scale-105 flex items-center" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg> Añadir
        </button>
      </form>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-2 md:space-x-4 mt-8">
        <button onClick={() => saveListToFile()} className="w-full sm:w-auto px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition-colors transform hover:scale-105 flex items-center justify-center text-sm" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm10.293 5.293a1 1 0 00-1.414 0L9 11.586 7.707 10.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" /></svg> Guardar
        </button>
        <label className="w-full sm:w-auto px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-lg transition-colors transform hover:scale-105 cursor-pointer flex items-center justify-center text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg> Cargar <input type="file" accept=".txt" onChange={loadListFromFile} className="hidden" />
        </label>
        <button onClick={shareListViaWhatsApp} className="w-full sm:w-auto px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors transform hover:scale-105 flex items-center justify-center text-sm" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/> </svg> WhatsApp
        </button>
        <button onClick={sendListByEmail} className="w-full sm:w-auto px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-colors transform hover:scale-105 flex items-center justify-center text-sm" >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"> <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /> <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /> </svg> Email
        </button>
      </div>
    </div>
  );
};

export default ShoppingAppComp;
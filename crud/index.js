const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyAHCpISAQC3Z9s3wimN9uvU0r9l76s5L9I",
    authDomain: "pedidos-leonardo-poglia.firebaseapp.com",
    projectId: "pedidos-leonardo-poglia",
    storageBucket: "pedidos-leonardo-poglia.appspot.com",
    messagingSenderId: "533515143761",
    appId: "1:533515143761:web:43aa2c3479e4849a744670",
    measurementId: "G-0FBW8CGEZW"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();


async function salvar(nomeTabela, id, dado) {

    if (id) {
        console.log("a")
        const referencesEntity = await setDoc(doc(db, nomeTabela, id), dado);;
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        console.log("b")
        const referencesEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado,
            id: referencesEntity.id
        }
        return savedData;
    }
}

async function buscar(nomeTabela) {
    const tableRef = collection(db, nomeTabela);

    const q = query(tableRef);
    const querySnapshot = await getDocs(q);
    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);
    });
    return lista;
}

async function buscarPorID(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Não funcionou!");
    }
}

async function remover(nomeTabela, id) {
    const dado = await deleteDoc(doc(db, nomeTabela, id));
    return {
        message: `${id} deletado`
    }
}

module.exports = {
    salvar,
    buscar,
    buscarPorID,
    remover
}
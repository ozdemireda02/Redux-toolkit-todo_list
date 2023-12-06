import { Modal,Button, Form, FormGroup } from "react-bootstrap"
import { addTask, editTask } from "../redux/slices/crudSlice";
import { useDispatch } from "react-redux";

// bu formu hem düzenleme için hem de ekleme için kullanacağız.
// bu nokta da ne zaman düzenleme modunda ne zamanda ekleme modunda olacak karar vermemiz lazım
// bu kararı gelen editItem parametresine göre vereceğiz
// eğer ki null(boş yani) geldiyse  ekleme modundayız
// null gelmediyse o zaman düzenleme modundayız.
const FormModal = ({isOpen,close,editItem}) => {

    const dispatch = useDispatch();

    // form gönderildiğinde
    const handleSubmit = (e) => { 
        e.preventDefault();
        // formdaki inputların verisine erişme
        const form = new FormData(e.target);
        const newTask = Object.fromEntries(form.entries());
        
        if(editItem){
          // düzenle
          dispatch(editTask({...newTask,id:editItem.id}));
        }else{
          // store'a yeni eleman eklemeye yarayan aksiyonu dispatch ettik
         dispatch(addTask(newTask));
        }
          // modal ı kapat
        close();
        
    }
  return (
    <Modal
    show={isOpen}
    // çarpıya basınca çalışan fonksiyon
    onHide={close}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter "
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title className="text-black" id="contained-modal-title-vcenter">
        {editItem ? "Görevi Düzenle" : "Yeni Görev Oluştur"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-black">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Form.Label>Görev Başlığı</Form.Label>
            <Form.Control defaultValue={editItem?.title} required type="text" name="title" placeholder="Görev Giriniz.." />
        </FormGroup>
        <FormGroup className="my-3">
            <Form.Label>Yazar</Form.Label>
            <Form.Control defaultValue={editItem?.author} required type="text" name="author" placeholder="İsminizi Giriniz.." />
        </FormGroup>
        <FormGroup>
            <Form.Label>Atanan Kişi</Form.Label>
            <Form.Control defaultValue={editItem?.assigned_to} required type="text" name="assigned_to" placeholder="Atanan Kişiyi Giriniz.." />
        </FormGroup>
        <FormGroup className="mt-3">
            <Form.Label>Son Teslim Tarihi</Form.Label>
            <Form.Control defaultValue={editItem?.end_date} required type="date" name="end_date" placeholder="Tarih Giriniz.." />
        </FormGroup>
        <Modal.Footer className="mt-3">
    <Button onClick={close}>Close</Button>
    <Button type="submit" variant="success" >Kaydet</Button>
    </Modal.Footer>
      </Form>
    </Modal.Body>
    
  </Modal>
  )
}

export default FormModal
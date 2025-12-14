"use client"

import styles from './manage_product.module.scss';
import { useState, useEffect } from 'react';
import fetchGetProduct from './api/getAllProduct.js';
import fetchDetailProduct from './api/detail_product.js';
import fetchAddProduct from './api/add_product.js';
import fetch_get_promotion from './api/get_promotion.js';
import fetchUpdateProduct from './api/update_product.js';
import fetchSoftDelete from './api/soft_delete.js';

import { IoIosColorPalette } from "react-icons/io";
import { MdOutlineSdStorage, MdScreenshot, MdSystemUpdate, MdCameraFront, MdCameraRear, MdOutlineFitScreen  } from "react-icons/md";
import { BiMicrochip } from "react-icons/bi";
import { FaBatteryThreeQuarters, FaMicrochip, FaNfcDirectional   } from "react-icons/fa6";
import { GiLightningFrequency } from "react-icons/gi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { TbBrandAdobeAfterEffect } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaLock,FaLockOpen   } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


import Image from 'next/image';
import { error } from 'node:console';

interface AllProduct {
    id_product: number;
    name_product: string;
    price: number;
    brand: string;
    quantity: number;
    status: string;
    name_promotion: string;
    rate: number;
    is_del_phone: number;
}

interface DetailProduct {
    id_detail_product: number;
    id_product: number;
    color: string;
    rom: string;
    ram: string;
    screen_size: number;
    battery: number;
    description_phone: string;
    front_camera: string;
    rear_camera: string;
    cpu_detail: string;
    operating_system: string;
    chip_nfc: number;
    resolution: string;
    screen_frequency: string;
    video: string;
    id_image: number;
    image_url: string;
    is_main: number;
    name_product: string;
    warranty: string;
    brand: string;
    price: string;
    type: string;
    quantity: string;
    product_code: string;
    id_promotion: number;
    promotion_name: string;
    status: String;
}

interface Promotion{
    id_promotion: number;
    start_at: string;
    end_at: string;
    percent: number;
    name_promotion: string;
    describe_promotion: string;
}

export default function ManageProduct () {

    const [phones, setPhones] = useState<AllProduct[]>([]);
    const [detail, setDetail] = useState<DetailProduct | null>(null);
    const [promotion, setPromotion] = useState<Promotion[]>([]);
    const [id_promotion, setId_promotion] = useState<number | null>(null);
    const [displayinf, set_displayinf] = useState(false);
    const [display_add_product, setDisplay_add_product] = useState(false);
    const [display_update_product, setDisplay_update_product] = useState(false)
    const [display_notification, set_display_notification] = useState(false);
    const [display_notification_del, set_display_notification_del] = useState(false);
    const [name_btn_del, setNameBtnDel] = useState(true);

    // State cho form thêm sản phẩm
    const [name_product, setName_product] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Điện thoại');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [product_code, setProduct_code] = useState('');
    const [color, setColor] = useState('');
    const [rom, setRom] = useState('');
    const [ram, setRam] = useState('');
    const [screen_size, setScreen_size] = useState('');
    const [battery, setBattery] = useState('');
    const [description_phone, setDescription_phone] = useState('');
    const [warranty, setWarranty] = useState('');
    const [front_camera, setFront_camera] = useState('');
    const [rear_camera, setRear_camera] = useState('');
    const [cpu_detail, setCpu_detail] = useState('');
    const [operating_system, setOperating_system] = useState('');
    const [chip_nfc, setChip_nfc] = useState(1);
    const [resolution, setResolution] = useState('');
    const [screen_frequency, setScreen_frequency] = useState('');
    const [video, setVideo] = useState('');
    const [image_url, setImage_url] = useState('');
    const [id_product, setId_product] = useState('');
    const [status, setStatus] = useState('');
    async function fetchAllProduct(){
        console.log('Fetching data to get all product');
        try{
            const result = await fetchGetProduct();
            if(!result){
                throw new Error('Http error!');
            }

            console.log('Data lấy được: ', result.data);

            const p = result.data ?? {};
            const normalized : AllProduct[] = (result.data ?? []).map((p:any) => ({
                id_product: Number(p.id_product),
                name_product: p.name_product,
                price: Number(p.price),
                brand: p.brand,
                quantity: Number(p.quantity),
                status: p.status,
                name_promotion: p.name_promotion,
                rate: Number(p.rate),
                is_del_phone: Number(p.is_del_phone)
            }));
            setPhones(normalized);
        }
        catch(err){
            console.error('Error while fetching data', err);
        }
    }

    async function fetchViewDetail(id_product:any){
        console.log('Fetching data from API view detail product');
        try{
            const result = await fetchDetailProduct(id_product);
            if(!result){
                throw new Error('http error');
            }
            console.log('data chi tiết: ',result.data);
            const dt = result.data;
            const abc : DetailProduct ={
                id_detail_product: Number(dt.id_detail_product),
                id_product: Number(dt.id_product),
                color: dt.color,
                rom: dt.rom,
                ram: dt.ram,
                screen_size: Number(dt.screen_size),
                battery: Number(dt.battery),
                description_phone: dt.description_phone,
                front_camera: dt.front_camera,
                rear_camera: dt.rear_camera,
                cpu_detail: dt.cpu_detail,
                operating_system: dt.operating_system,
                chip_nfc: dt.chip_nfc,
                resolution: dt.resolution,
                screen_frequency: dt.screen_frequency,
                video: dt.video,
                id_image: Number(dt.id_image),
                image_url: dt.image_url,
                is_main: Number(dt.is_main),
                name_product: dt.name_product,
                warranty: dt.warranty,
                brand: dt.brand,
                price: dt.price,
                type : dt.type,
                quantity: dt.quantity,
                product_code: dt.product_code,
                promotion_name: dt.product_name,
                id_promotion: dt.id_promotion,
                status: dt.status
            };
            setDetail(abc);
        }
        catch(err){
            console.error('Error while fetching data!', err);
        }
    }

    async function call_add_product(){
        try{
            // Kiểm tra các trường bắt buộc
            if (!name_product.trim()) {
                alert('Vui lòng nhập tên sản phẩm!');
                return;
            }
            if (!price.trim()) {
                alert('Vui lòng nhập giá sản phẩm!');
                return;
            }
            if (!brand.trim()) {
                alert('Vui lòng nhập thương hiệu!');
                return;
            }
            if (!quantity.trim()) {
                alert('Vui lòng nhập số lượng!');
                return;
            }
            if (!product_code.trim()) {
                alert('Vui lòng nhập mã sản phẩm!');
                return;
            }
            if (!color.trim()) {
                alert('Vui lòng nhập màu sắc!');
                return;
            }
            if (!rom.trim()) {
                alert('Vui lòng nhập ROM!');
                return;
            }
            if (!ram.trim()) {
                alert('Vui lòng nhập RAM!');
                return;
            }
            if (!screen_size.trim()) {
                alert('Vui lòng nhập kích thước màn hình!');
                return;
            }
            if (!battery.trim()) {
                alert('Vui lòng nhập dung lượng pin!');
                return;
            }
            if (!description_phone.trim()) {
                alert('Vui lòng nhập mô tả sản phẩm!');
                return;
            }
            if (!warranty.trim()) {
                alert('Vui lòng nhập thời hạn bảo hành!');
                return;
            }
            if (!front_camera.trim()) {
                alert('Vui lòng nhập thông số camera trước!');
                return;
            }
            if (!rear_camera.trim()) {
                alert('Vui lòng nhập thông số camera sau!');
                return;
            }
            if (!cpu_detail.trim()) {
                alert('Vui lòng nhập chi tiết CPU!');
                return;
            }
            if (!operating_system.trim()) {
                alert('Vui lòng nhập hệ điều hành!');
                return;
            }
            if (!resolution.trim()) {
                alert('Vui lòng nhập độ phân giải!');
                return;
            }
            if (!screen_frequency.trim()) {
                alert('Vui lòng nhập tần số quét!');
                return;
            }
            if (!video.trim()) {
                alert('Vui lòng nhập link video!');
                return;
            }
            if (!image_url.trim()) {
                alert('Vui lòng nhập link ảnh sản phẩm!');
                return;
            }

            const info = {
                name_product: name_product,
                price: Number(price),
                type: type,
                brand: brand,
                quantity: Number(quantity),
                status: Number(quantity) > 0 ? "Còn hàng" : "Hết hàng",
                product_code: product_code,
                rate: 0,
                color: color,
                rom: rom,
                ram: ram,
                screen_size: Number(screen_size),
                battery: Number(battery),
                description_phone: description_phone,
                warranty: warranty,
                front_camera: front_camera,
                rear_camera: rear_camera,
                cpu_detail: cpu_detail,
                operating_system: operating_system,
                chip_nfc: chip_nfc,
                resolution: resolution,
                screen_frequency: screen_frequency,
                video: video,
                image_url: image_url
            }

            const result = await fetchAddProduct(info);
            if(!result){
                throw new Error('http error');
            }
            
            alert('Thêm sản phẩm thành công!');
            setDisplay_add_product(false);
            
            // Reset form
            setName_product('');
            setPrice('');
            setType('Điện thoại');
            setBrand('');
            setQuantity('');
            setProduct_code('');
            setColor('');
            setRom('');
            setRam('');
            setScreen_size('');
            setBattery('');
            setDescription_phone('');
            setWarranty('');
            setFront_camera('');
            setRear_camera('');
            setCpu_detail('');
            setOperating_system('');
            setChip_nfc(1);
            setResolution('');
            setScreen_frequency('');
            setVideo('');
            setImage_url('');
            
            // Reload danh sách sản phẩm
            fetchAllProduct();

        }
        catch(err){
            console.error('Error while fetching data', err);
            alert('Có lỗi xảy ra khi thêm sản phẩm!');
        }
    }
    
    async function fetch_getPromotion(){
        console.log('fetching data to get product: ');
        try{
            const result = await fetch_get_promotion();
            
           // const normalized : AllProduct[] = (result.data ?? []).map((p:any) => ({
            const pro : Promotion[] = (result.data ?? []).map((p:any) => ({
              id_promotion: p.id_promotion,
                start_at: p.start_at,
                end_at: p.end_at,
                percent: p.percent,
                name_promotion: p.name_promotion,
                describe_promotion: p.describe_promotion  
            }));
            console.log("promotion: ",promotion);
            setPromotion(pro);
        }
        catch(err){
            console.error('http error', err);
        }
    }

    async function callApiUpdate(){
        console.log('fetching data to update product: ');

        const data = {
            id_product: id_product,
            name_product: name_product,
            price: price,
            type: type,
            brand: brand,
            quantity: quantity,
            status: status,
            id_promotion: id_promotion,
            product_code: product_code,
            color: color,
            rom: rom,
            ram: ram,
            screen_size: screen_size,
            battery: battery,
            description_phone: description_phone,
            warranty: warranty,
            front_camera: front_camera,
            rear_camera: rear_camera,
            cpu_detail: cpu_detail,
            operating_system: operating_system,
            chip_nfc: chip_nfc,
            resolution: resolution,
            screen_frequency: screen_frequency,
            video: video,
            image_url: image_url
        }


        try{
            const result = await fetchUpdateProduct(data);

            if(!result){
                console.log('error while updating product infomation!');
                throw new Error;
            }

            set_display_notification(true);
            setDisplay_update_product(false);

        }
        catch(err){
            console.error('http error', err);
        }
    }

    function reload_page () {
        window.location.reload();
    }

    async function callAPI_del (id_product: number){
        console.log('Fetching API soft_delete to delete one product...');
        try{
            console.log('debug id: ',id_product);
            const result = await fetchSoftDelete(id_product);
            if(!result){
                throw new Error ;
            }
            set_display_notification_del(true);
            //reload_page();
        }
        catch(err){
            console.error('Http error!', err);
        }
    }


    useEffect(() => {
        if (detail) {
            setName_product(detail.name_product);
            setPrice(detail.price);
            setType(detail.type);
            setBrand(detail.brand);
            setQuantity(detail.quantity);
            setProduct_code(detail.product_code);
            setColor(detail.color);
            setRom(detail.rom);
            setRam(detail.ram);
            setScreen_size(String(detail.screen_size));
            setBattery(String(detail.battery));
            setDescription_phone(detail.description_phone);
            setWarranty(detail.warranty);
            setFront_camera(detail.front_camera);
            setRear_camera(detail.rear_camera);
            setCpu_detail(detail.cpu_detail);
            setOperating_system(detail.operating_system);
            setChip_nfc(detail.chip_nfc);
            setResolution(detail.resolution);
            setScreen_frequency(detail.screen_frequency);
            setVideo(detail.video);
            setImage_url(detail.image_url);
            setId_promotion(detail.id_promotion || null);
            setId_product(String(detail.id_product));
            setStatus(String(detail.status))
        }
    }, [detail]);


    const handleUpdate = async (e:any) => {
        e.preventDefault();
        
    }
    

    useEffect(() => {
        fetchAllProduct();
        fetch_getPromotion()
    }, [])

   


    return(
        <section className={styles.manage_account}>
            <div className={styles.container}>
                <h1>Quản lý sản phẩm</h1>
                <button className={styles.btn_them} onClick={() => setDisplay_add_product(true)}><IoMdAddCircleOutline/> Thêm sản phẩm</button>
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Rate</th>
                            <th>Promotion</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {phones.map((acc) => (
                            <tr key={acc.id_product}>
                                <td>{acc.id_product}</td>
                                <td>{acc.name_product}</td>
                                <td>{acc.price}</td>
                                <td>{acc.brand}</td>
                                <td>{acc.quantity}</td>
                                <td>{acc.status}</td>
                                <td>{acc.rate}</td>
                                <td>{acc.name_promotion || 'Chưa áp dụng khuyến mãi' } </td>
                                <td style={{display:'flex', gap: '0.5rem', flexDirection: 'column'}}>
                                    {/* <button className={styles.btn_unable} onClick={() => fetch_unabel_account(acc.id_user)}>Vô hiệu hóa</button> */}
                                    <button className={styles.btn_xem} onClick={() => {set_displayinf(true); fetchViewDetail(acc.id_product)}}>Xem thông tin</button>
                                    <button className={styles.btn_sua} onClick={() => {setDisplay_update_product(true); fetchViewDetail(acc.id_product) }}>Sửa</button>
                                    <button className={styles.btn_xoa} onClick={() => {callAPI_del(acc.id_product); setNameBtnDel(!name_btn_del)} }>{ acc.is_del_phone === 1 ? 'Gỡ xóa' : 'Xóa' }</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            

            {/*Hiển thị thông tin chi tiết */}
            <div className={displayinf ? styles.container_detail : styles.container_detail_none } onClick={()=> set_displayinf(false)}>
                <div className={styles.detail} onClick={(e) => e.stopPropagation()}>
                    <h1>Thông tin chi tiết</h1>
                    <div className={styles.gridContainer}>
                    
                        {/* Cột trái: ảnh + tên */}
                        <div className={styles.item}>
                            {detail && (
                            <>
                                <div className={styles.img_ten}>
                                <Image
                                    src={detail.image_url}
                                    width={100}
                                    height={100}
                                    alt={detail.name_product}
                                />
                                <span>{detail.name_product}</span>
                                </div>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><TbBrandAdobeAfterEffect className={styles.icon}/> Thương hiệu: {detail.brand}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><IoIosColorPalette className={styles.icon}/> Màu sắc: {detail.color}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdOutlineSdStorage className={styles.icon}/>ROM: {detail.rom}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><BiMicrochip className={styles.icon}/> RAM: {detail.ram}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdScreenshot className={styles.icon}/>Kích thước màn hình: {detail.screen_size}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><FaBatteryThreeQuarters className={styles.icon}/>Pin: {detail.battery} mAh</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdSystemUpdate className={styles.icon}/>Hệ điều hành: {detail.operating_system}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><FaMicrochip className={styles.icon}/>CPU: {detail.cpu_detail}</p>
                            </>
                            )}
                        </div>

                        {/* Cột phải: thông số chi tiết */}
                        <div className={styles.item}>
                            {detail && (
                            <>
                                
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdCameraFront  className={styles.icon}/>Camera trước: {detail.front_camera}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdCameraRear className={styles.icon}/>Camera sau: {detail.rear_camera}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><FaNfcDirectional  className={styles.icon}/>Chip NFC: {detail.chip_nfc ? 'Có' : 'Không'}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><MdOutlineFitScreen  className={styles.icon}/>Độ phân giải: {detail.resolution}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><GiLightningFrequency className={styles.icon}/>Tần số màn hình: {detail.screen_frequency}</p>
                                <p style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.3rem'}}><AiOutlineFileProtect className={styles.icon}/>Bảo hành: {detail.warranty}</p>
                                <iframe
                                width="100%"
                                height="180"
                                src={detail.video}
                                title="Video sản phẩm"
                                frameBorder="0"
                                allowFullScreen
                                ></iframe>
                            </>
                            )}
                        </div>

                    </div>
                </div>
            </div>

           {/*form thêm dữ liệu mới */}
           <div className={display_add_product ? styles.container_add_product : styles.container_add_product_none} onClick={() => setDisplay_add_product(false)}>
                <div className={styles.add_product} onClick={(e) => e.stopPropagation()}>
                    <h1>Thêm sản phẩm mới</h1>
                    
                    <div className={styles.gridContainer}>
                    
                        {/* Cột trái: ảnh + tên */}
                        <div className={`${styles.item} ${styles.content}`}>
                            <span>Tên sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập tên sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={name_product}
                                    onChange={(e) => setName_product(e.target.value)}
                                />
                            </div>
                            <br/>
                            <span>Giá sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập giá sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <br/>
                            
                            <span>Loại sản phẩm:</span>
                            <select
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border rounded p-1 w-full"
                            >
                                <option value="Smartphone">Điện thoại</option>
                                <option value="Máy tính bảng">Máy tính bảng</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <br/>
                            <span>Thương hiệu:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thương hiệu sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>

                             <br/>
                            <span>Số lượng:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập số lượng sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Mã sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập mã code sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={product_code}
                                    onChange={(e) => setProduct_code(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Màu sắc:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập màu sắc sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>


                            <br/>
                            <span>ROM:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập cấu hình ROM sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={rom}
                                    onChange={(e) => setRom(e.target.value)}
                                />
                            </div>


                            <br/>
                            <span>RAM:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập cấu hình RAM sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={ram}
                                    onChange={(e) => setRam(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Kích thước màn hình:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập kích thước màn hình..."
                                    style={{borderColor: 'black'}}
                                    value={screen_size}
                                    onChange={(e) => setScreen_size(e.target.value)}
                                />
                            </div>

                        </div>

                        {/* Cột phải: thông số chi tiết */}
                        <div className={styles.item}>
                            
                            <span>Dung lượng pin:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập dung lượng pin (mAh)..."
                                    style={{borderColor: 'black'}}
                                    value={battery}
                                    onChange={(e) => setBattery(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Mô tả sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập mô tả sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={description_phone}
                                    onChange={(e) => setDescription_phone(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Thời hạn bảo hành:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thời hạn bảo hành sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={warranty}
                                    onChange={(e) => setWarranty(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Camera trước:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thông số camera trước..."
                                    style={{borderColor: 'black'}}
                                    value={front_camera}
                                    onChange={(e) => setFront_camera(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Camera sau:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thông số camera sau..."
                                    style={{borderColor: 'black'}}
                                    value={rear_camera}
                                    onChange={(e) => setRear_camera(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Chi tiết CPU:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập chi tiết cấu hình CPU..."
                                    style={{borderColor: 'black'}}
                                    value={cpu_detail}
                                    onChange={(e) => setCpu_detail(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Hệ điều hành:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập hệ điều hành..."
                                    style={{borderColor: 'black'}}
                                    value={operating_system}
                                    onChange={(e) => setOperating_system(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Chip NFC:</span>
                            <select
                                name="chip_nfc"
                                value={chip_nfc}
                                onChange={(e) => setChip_nfc(Number(e.target.value))}
                                className="border rounded p-1 w-full"
                            >
                                <option value={1}>Có</option>
                                <option value={0}>Không</option>
                            </select>

                            <br/><br/>
                            <span>Độ phân giải:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập độ phân giải màn hình của sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                />
                            </div>

                             <br/>
                            <span>Tần số quét:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập tần số quét màn hình của sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={screen_frequency}
                                    onChange={(e) => setScreen_frequency(e.target.value)}
                                />
                            </div>


                             <br/>
                            <span>Link video:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập link video youtube quảng cáo sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={video}
                                    onChange={(e) => setVideo(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Link ảnh sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập link ảnh sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={image_url}
                                    onChange={(e) => setImage_url(e.target.value)}
                                />
                            </div>

                        </div>

                        
                    </div>

                    <div className={styles.container_button}>
                        <button className={styles.btn_Luu} onClick={call_add_product}>Lưu</button>
                        <button className={styles.btn_Huy} onClick={() => setDisplay_add_product(false)}>Hủy</button>
                    </div>

                </div>
           </div>

            {/* Sửa dữ liệu */}
           <div className={display_update_product ? styles.container_add_product : styles.container_add_product_none} onClick={() => setDisplay_update_product(false)}>
                <div className={styles.add_product} onClick={(e) => e.stopPropagation()}>
                    <h1>Sửa thông tin sản phẩm</h1>
                    
                    <div className={styles.gridContainer}>
                        {detail && (
                        <>
                            {/* Cột trái: ảnh + tên */}
                        <div className={`${styles.item} ${styles.content}`}>
                            <span>Tên sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập tên sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={name_product}
                                    onChange={(e) => setName_product(e.target.value)}
                                />
                            </div>
                            <br/>
                            <span>Giá sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập giá sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <br/>
                            
                            <span>Loại sản phẩm:</span>
                            <select
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border rounded p-1 w-full"
                            >
                                <option value="Smartphone">Điện thoại</option>
                                <option value="Máy tính bảng">Máy tính bảng</option>
                                <option value="Khác">Khác</option>
                            </select>

                            <br/>
                            <span>Thương hiệu:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thương hiệu sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>

                             <br/>
                            <span>Số lượng:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập số lượng sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Mã sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập mã code sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={product_code}
                                    onChange={(e) => setProduct_code(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Màu sắc:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập màu sắc sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>


                            <br/>
                            <span>ROM:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập cấu hình ROM sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={rom}
                                    onChange={(e) => setRom(e.target.value)}
                                />
                            </div>


                            <br/>
                            <span>RAM:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập cấu hình RAM sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={ram}
                                    onChange={(e) => setRam(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Kích thước màn hình:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập kích thước màn hình..."
                                    style={{borderColor: 'black'}}
                                    value={screen_size}
                                    onChange={(e) => setScreen_size(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Chương trình khuyến mãi:</span>
                            <select
                                name="id_promotion"
                                value={id_promotion || ''}
                                onChange={(e) => setId_promotion(e.target.value ? Number(e.target.value) : null)}
                                className="border rounded p-1 w-full"
                            >
                                <option value="">Không áp dụng khuyến mãi</option>
                                {promotion?.map((pr) => (
                                    <option key={pr.id_promotion} value={pr.id_promotion}>
                                        {pr.name_promotion}
                                    </option>
                                ))}
                            </select>

                            <br/>
                            <span>Trạng thái:</span>
                            <select
                                name="type"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="border rounded p-1 w-full"
                            >
                                <option value="Còn hàng">Còn hàng</option>
                                <option value="Hết hàng">Hết hàng</option>
                            </select>

                            

                        </div>

                        {/* Cột phải: thông số chi tiết */}
                        <div className={styles.item}>
                            
                            <span>Dung lượng pin:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="number" 
                                    className={styles.input}
                                    placeholder="Nhập dung lượng pin (mAh)..."
                                    style={{borderColor: 'black'}}
                                    value={battery}
                                    onChange={(e) => setBattery(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Mô tả sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập mô tả sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={description_phone}
                                    onChange={(e) => setDescription_phone(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Thời hạn bảo hành:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thời hạn bảo hành sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={warranty}
                                    onChange={(e) => setWarranty(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Camera trước:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thông số camera trước..."
                                    style={{borderColor: 'black'}}
                                    value={front_camera}
                                    onChange={(e) => setFront_camera(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Camera sau:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập thông số camera sau..."
                                    style={{borderColor: 'black'}}
                                    value={rear_camera}
                                    onChange={(e) => setRear_camera(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Chi tiết CPU:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập chi tiết cấu hình CPU..."
                                    style={{borderColor: 'black'}}
                                    value={cpu_detail}
                                    onChange={(e) => setCpu_detail(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Hệ điều hành:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập hệ điều hành..."
                                    style={{borderColor: 'black'}}
                                    value={operating_system}
                                    onChange={(e) => setOperating_system(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Chip NFC:</span>
                            <select
                                name="chip_nfc"
                                value={chip_nfc}
                                onChange={(e) => setChip_nfc(Number(e.target.value))}
                                className="border rounded p-1 w-full"
                            >
                                <option value={1}>Có</option>
                                <option value={0}>Không</option>
                            </select>

                            <br/><br/>
                            <span>Độ phân giải:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập độ phân giải màn hình của sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={resolution}
                                    onChange={(e) => setResolution(e.target.value)}
                                />
                            </div>

                             <br/>
                            <span>Tần số quét:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập tần số quét màn hình của sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={screen_frequency}
                                    onChange={(e) => setScreen_frequency(e.target.value)}
                                />
                            </div>


                             <br/>
                            <span>Link video:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập link video youtube quảng cáo sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={video}
                                    onChange={(e) => setVideo(e.target.value)}
                                />
                            </div>

                            <br/>
                            <span>Link ảnh sản phẩm:</span>
                            <div className={styles.container_input}>
                                <input 
                                    type="text" 
                                    className={styles.input}
                                    placeholder="Nhập link ảnh sản phẩm..."
                                    style={{borderColor: 'black'}}
                                    value={image_url}
                                    onChange={(e) => setImage_url(e.target.value)}
                                />
                            </div>
                        </div>
                            </>
                        )}
                        

                        </div>

                        <div className={styles.container_button}>
                            <button className={styles.btn_Luu} onClick={()=>callApiUpdate()} >Lưu</button>
                            <button className={styles.btn_Huy} onClick={() => setDisplay_update_product(false)}>Hủy</button>
                        </div>
                    </div>

                    

                </div>
             
             <div className={display_notification ? styles.container_notification : styles.notification_none} onClick={() => {set_display_notification(false); reload_page()}}>
                <div className={  styles.notification }>
                    <span>Đã cập nhật thông tin sản phẩm thành công!</span>
                    <FaCheckCircle  style={{color: 'green', fontSize: '50pt'}}/>
                </div>
            </div>

            <div className={display_notification_del ? styles.container_notification : styles.notification_none} onClick={() => {set_display_notification_del(false); reload_page()}}>
                <div className={  styles.notification }>
                    <span>Đã cập ẩn sản phẩm thành công!</span>
                    <FaCheckCircle  style={{color: 'green', fontSize: '50pt'}}/>
                </div>
            </div>


        </section>
    );
};

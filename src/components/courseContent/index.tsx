import { HiOutlineExternalLink } from 'react-icons/hi'
import { MdLabelImportant } from 'react-icons/md'
import { IQuarterData } from '@/types/quarter';
import { MdOutlineAccessTimeFilled } from 'react-icons/md'

interface ITrackDataType {
    trackName: string,
    data: IQuarterData
}

const compulsoryNames = ['Programming Fundamentals', 'Web2 Using NextJS', 'Earn as You Learn']


function Coursecontent({ data }: { data: ITrackDataType | IQuarterData }) {

    function isTrack(track: ITrackDataType | IQuarterData): track is ITrackDataType {
        return 'trackName' in track;
    }
    let trackName = ''
    if (isTrack(data)) {
        trackName = data.trackName
        data = data.data
    }
    else {
        data = data
    }
    return (
        <div className='w-full lg:p-0 p-3 rounded-md'>

            {/* Course Info */}
            <div className='sm:flex block py-3 justify-between mt-5 border-b border-zinc-300 mb-5 pb-3'>
                {
                    data.id > 3 ?
                        <h1 className='xs:text-5xl text-3xl text-zinc-800 font-bold'>Course: {data.id}</h1> :
                        <h1 className='lg:text-3xl md:text-xl text-3xl text-zinc-800 font-bold'>{compulsoryNames[data.id - 1]}</h1>
                }
                <div className='text-sm text-center sm:mt-0 mt-5 rounded-lg text-zinc-800 flex xs:gap-5 gap-2 items-center w-fit'><span className='w-4'><MdOutlineAccessTimeFilled size={20} /></span><p><span className='font-bold'>Duration: </span>( 13 Weeks )</p> </div>
            </div>
            <div className='border-b-8 border-zinc-900 md:px-5 px-3 py-5 rounded-md bg-gray-50 mb-14 relative overflow-hidden'>
                <h1 className='lg:text-4xl text-3xl font-bold text-zinc-800'>{trackName ? trackName : 'Common In All Specializations'}</h1>
                <p className='text-zinc-800 mt-2'>{data.objective}</p>
            </div>

            {/* Course Description */}

            <div className='text-zinc-800'>
                <h1 className='lg:text-4xl text-3xl font-bold pb-3 border-b border-zinc-500 '>Course Description</h1>
                <div className='mt-5'>
                    {
                        data.description.map((val, index) => {
                            return (
                                <p key={index} className='mb-5 lg:text-base text-sm text-zinc-800 font-normal bg-gray-50 md:p-5 p-3 rounded-md'>{val}</p>
                            )
                        })
                    }
                </div>
            </div>

            {/* Course Outline */}

            <div className='mt-12'>
                <h1 className='lg:text-4xl text-3xl font-bold pb-3 border-b border-zinc-500 text-zinc-800'>Course Outline</h1>
                <div className='mt-10'>
                    {
                        data.outline.map((val, index) => {
                            return (
                                <div key={index}>
                                    <h1 className='sm:text-2xl text-xl text-[#045084] font-extrabold mb-5 mt-10'>{index + 1}. {val.title}</h1>
                                    <div className={val.children?.length ? 'lg:text-base text-sm font-normal text-zinc-800 bg-gray-50 md:p-5 p-3 rounded-md' : ''}>
                                        {
                                            val.children?.map((child, childIndex) => {
                                                return (
                                                    <div key={childIndex} className='mt-4 mb-4'>
                                                        {child.map((sub_child: any, subChildIndex) => {
                                                            return (
                                                                <div key={subChildIndex} className=''>
                                                                    {
                                                                        sub_child.type === 'text' ?
                                                                            <p>{sub_child.text}</p>
                                                                            :
                                                                            sub_child.type === 'link' ?
                                                                                <a href={sub_child.url} className='text-blue-600 flex items-center gap-3 w-fit'>
                                                                                    <span className='w-[4]'><HiOutlineExternalLink className='text-zinc-800' size={16} /></span>
                                                                                    <span className='lowercase'>{sub_child.text}</span>
                                                                                </a>
                                                                                :
                                                                                sub_child.type === 'sub-heading' ?
                                                                                    <p className='text-xl font-extrabold text-zinc-800'>{sub_child.text}</p>
                                                                                    :
                                                                                    sub_child.type === 'h3' ?
                                                                                        <p className='text-lg font-extrabold text-zinc-800'>{sub_child.text}</p>
                                                                                        :
                                                                                        sub_child.type === 'note' ?
                                                                                            <p className='flex items-start gap-3 font-bold'><span className=' w-4'><MdLabelImportant className='text-[#a048e8]' size={16} /></span>Note : {sub_child.text}</p>
                                                                                            :
                                                                                            sub_child.type === 'list' ?
                                                                                                <ul className='list-disc ml-10'>

                                                                                                    {
                                                                                                        sub_child.children.map((list: any, list_index: number) => {
                                                                                                            return (
                                                                                                                <li key={list_index} className='mb-2 mt-2'>
                                                                                                                    {
                                                                                                                        list.map((list_item: any, list_item_index: number) => {
                                                                                                                            return (
                                                                                                                                <div key={list_item_index}>
                                                                                                                                    {
                                                                                                                                        list_item.type === 'text' ?
                                                                                                                                            <p>{list_item.text}</p>
                                                                                                                                            :
                                                                                                                                            list_item.type === 'link' ?
                                                                                                                                                <a href={list_item.url} className='text-blue-600 flex items-center gap-3'>
                                                                                                                                                    <span className='w-[10px]'><HiOutlineExternalLink className='text-zinc-800' size={16} /></span>
                                                                                                                                                    <span className='lowercase'>{list_item.text}</span>
                                                                                                                                                </a>
                                                                                                                                                :
                                                                                                                                                false
                                                                                                                                    }
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }
                                                                                                                </li>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </ul>
                                                                                                :
                                                                                                false
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
}

export default Coursecontent;
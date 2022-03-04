import { Text } from 'src/components/Text'

export const InfoWithImages = () => {
  return (
    <>
      {[
        {
          title: 'Trophys',
          list: [
            {
              img: (
                <img
                  src={'/biography/trophy/trophy1.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/trophy/trophy2.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/trophy/trophy3.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/trophy/trophy4.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
          ],
        },
        {
          title: 'Awards',
          list: [
            {
              img: (
                <img src={'/biography/award/award1.png'} className=" " alt="" />
              ),
              text: '2x',
            },
            {
              img: (
                <img src={'/biography/award/award2.png'} className=" " alt="" />
              ),
              text: '2x',
            },
            {
              img: (
                <img src={'/biography/award/award3.png'} className=" " alt="" />
              ),
              text: '2x',
            },
            {
              img: (
                <img src={'/biography/award/award4.png'} className=" " alt="" />
              ),
              text: '2x',
            },
            {
              img: (
                <img src={'/biography/award/award5.png'} className=" " alt="" />
              ),
              text: '2x',
            },
          ],
        },

        {
          title: 'Caps',
          list: [
            {
              img: <img src={'/biography/cap/cap1.png'} className=" " alt="" />,
              text: '2x',
            },
            {
              img: <img src={'/biography/cap/cap2.png'} className=" " alt="" />,
              text: '2x',
            },
            {
              img: <img src={'/biography/cap/cap3.png'} className=" " alt="" />,
              text: '2x',
            },
            {
              img: <img src={'/biography/cap/cap4.png'} className=" " alt="" />,
              text: '2x',
            },
            {
              img: <img src={'/biography/cap/cap5.png'} className=" " alt="" />,
              text: '2x',
            },
          ],
        },
        {
          title: 'Programs',
          list: [
            {
              img: (
                <img
                  src={'/biography/program/program1.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/program/program2.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/program/program3.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/program/program4.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
          ],
        },

        {
          title: 'Challenges',
          list: [
            {
              img: (
                <img
                  src={'/biography/challenge/challenge1.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/challenge/challenge2.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/challenge/challenge3.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/challenge/challenge4.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
            {
              img: (
                <img
                  src={'/biography/challenge/challenge5.png'}
                  className=" "
                  alt=""
                />
              ),
              text: '2x',
            },
          ],
        },
      ].map((row, index) => (
        <div key={row.title} className="mb-[16px] ">
          <Text name="Subtitle2" className="text-Grey mb-[8px] ">
            {row.title}
          </Text>
          <div className="flex gap-x-[20px]">
            {row.list.map((o, index) => (
              <div key={index} className=" ">
                <div
                  className="w-[48px] h-[48px] rounded-[8px] bg-Dark-3
                    flex justify-center items-center mb-1 "
                >
                  {o.img}
                </div>
                <div className="text-white text-[14px] leading-[22px] text-center ">
                  {o.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

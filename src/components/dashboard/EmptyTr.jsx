export default function EmptyTr(props) {
  const {trClassName, tdClassName, text} = props;

  return (
    <tr className={`empty_tr ${trClassName}`} >
      <td
        className={`empty_text ${tdClassName}`}>
        {
          text
        }
      </td>
    </tr>
  )
}

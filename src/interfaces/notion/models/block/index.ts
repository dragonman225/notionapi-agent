import { BasicBlock } from "./basic_block"
import { DatabaseBlock } from "./database"
import { MediaBlock } from "./media"
import { EmbedBlock } from "./embed"
import { AdvancedBlock } from "./advanced_block"

/** 
 * Union of all types of blocks.
 * 
 * @category Notion Block
 */
export type Block =
  BasicBlock | DatabaseBlock | MediaBlock | EmbedBlock | AdvancedBlock
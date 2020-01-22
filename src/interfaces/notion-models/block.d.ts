import * as AdvancedBlock from "./block/advanced_block"
import * as BasicBlock from "./block/basic_block"
import * as DatabaseBlock from "./block/database"
import * as EmbedBlock from "./block/embed"
import * as MediaBlock from "./block/media"

/** 
 * All types of blocks.
 */
export type Block =
  AdvancedBlock.AdvancedBlockUnion | BasicBlock.BasicBlockUnion |
  DatabaseBlock.DatabaseBlockUnion | EmbedBlock.EmbedBlockUnion |
  MediaBlock.MediaBlockUnion

export namespace Block {

  type Breadcrumb = AdvancedBlock.Breadcrumb
  type Equation = AdvancedBlock.Equation
  type Factory = AdvancedBlock.Factory
  type TableOfContents = AdvancedBlock.TableOfContents

  type BulletedList = BasicBlock.BulletedList
  type Callout = BasicBlock.Callout
  type Column = BasicBlock.Column
  type ColumnList = BasicBlock.ColumnList
  type Divider = BasicBlock.Divider
  type Header = BasicBlock.Header
  type NumberedList = BasicBlock.NumberedList
  type Page = BasicBlock.Page
  type Quote = BasicBlock.Quote
  type SubHeader = BasicBlock.SubHeader
  type SubSubHeader = BasicBlock.SubSubHeader
  type Text = BasicBlock.Text
  type ToDo = BasicBlock.ToDo
  type Toggle = BasicBlock.Toggle

  type CollectionViewInline = DatabaseBlock.CollectionViewInline
  type CollectionViewPage = DatabaseBlock.CollectionViewPage

  type Codepen = EmbedBlock.Codepen
  type Embed = EmbedBlock.Embed
  type Invision = EmbedBlock.Invision
  type PDF = EmbedBlock.PDF

  type Audio = MediaBlock.Audio
  type Bookmark = MediaBlock.Bookmark
  type Code = MediaBlock.Code
  type File = MediaBlock.File
  type Image = MediaBlock.Image
  type Video = MediaBlock.Video

}
"""empty message

Revision ID: 24222eee586e
Revises: 148483f9f57c
Create Date: 2024-01-04 13:31:55.217831

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24222eee586e'
down_revision = '148483f9f57c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.Text(), nullable=True))
        batch_op.alter_column('profile_pic',
               existing_type=sa.TEXT(),
               nullable=False)
        batch_op.alter_column('location',
               existing_type=sa.TEXT(),
               nullable=False)
        batch_op.alter_column('display_name',
               existing_type=sa.TEXT(),
               nullable=False)
        batch_op.drop_index('ix_events_created')
        batch_op.create_index(batch_op.f('ix_events_created'), ['created'], unique=False)

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_events_created'))
        batch_op.create_index('ix_events_created', ['created'], unique=False)
        batch_op.alter_column('display_name',
               existing_type=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('location',
               existing_type=sa.TEXT(),
               nullable=True)
        batch_op.alter_column('profile_pic',
               existing_type=sa.TEXT(),
               nullable=True)
        batch_op.drop_column('description')

    # ### end Alembic commands ###
